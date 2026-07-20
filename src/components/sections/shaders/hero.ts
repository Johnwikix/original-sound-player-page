export const heroFragmentSource = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float iFrame;
uniform vec4 iDate;

in vec2 vUv;
out vec4 fragColor;

#define THRESHOLD .99
#define DUST
#define MIN_DIST .04
#define MAX_DIST 40.
#define MAX_DRAWS 40
#define AA 2
#define M_PI 3.1415926535897932384626433832795

float hash12(vec2 p)
{
    uvec2 q = uvec2(ivec2(p)) * uvec2(1597334673U, 3812015801U);
    uint n = (q.x ^ q.y) * 1597334673U;
    return float(n) * 2.328306437080797e-10;
}

float value2d(vec2 p);

float get_stars_rough(vec2 p)
{
    float s = smoothstep(THRESHOLD,1.,hash12(p));
    if (s >= THRESHOLD) 
        s = pow((s-THRESHOLD) / (1.-THRESHOLD), 10.);
    return s;
}

float get_stars(vec2 p, float a, float t)
{
    vec2 pg=floor(p), pc=p-pg, k=vec2(0,1);
    pc *= pc*pc*(3.-2.*pc);
    
    float s = mix(
        mix(get_stars_rough(pg+k.xx), get_stars_rough(pg+k.yx), pc.x),
        mix(get_stars_rough(pg+k.xy), get_stars_rough(pg+k.yy), pc.x),
        pc.y
    );
    return smoothstep(a,a+t, s)*pow(value2d(p*.1 + iTime)*.5+.5,8.3);
}

float value2d(vec2 p)
{
    vec2 pg=floor(p),pc=p-pg,k=vec2(0,1);
    pc*=pc*pc*(3.-2.*pc);
    return mix(
        mix(hash12(pg+k.xx),hash12(pg+k.yx),pc.x),
        mix(hash12(pg+k.xy),hash12(pg+k.yy),pc.x),
        pc.y
    );
}

float s5(float x) {return .5+.5*sin(x);}
float c5(float x) {return .5+.5*cos(x);}

float get_dust(vec2 p, vec2 size, float f)
{
    vec2 ar = vec2(iResolution.x/iResolution.y,1);
    
    vec2 pp = p * size * ar;
    return 
        pow(.64+.46*cos(p.x*6.28), 1.7)*
        f*
    (
        get_stars(.1*pp+iTime*vec2(20.,-10.1),.11,.71)*4. + 
        get_stars(.2*pp+iTime*vec2(30.,-10.1),.1,.31)*5. + 
        get_stars(.32*pp+iTime*vec2(40.,-10.1),.1,.91)*2.
    );
}

float sdf(vec3 p)
{
    p*=2.;

    float o = 8.2 * sin(.05 * p.x + iTime * .25) +
    (.04*p.z) *
    sin(p.x*.11+iTime) *
    2.*sin(p.z*.2+iTime) *
    value2d(
        vec2(.03,.4)*p.xz+vec2(iTime*.5,0)
    );
    return abs(dot(p,normalize(vec3(0,1,0.05)))+2.5+o*.5);
}

vec3 norm(vec3 p)
{
    const vec2 k=vec2(1,-1);
    const float t=.001;
    return normalize(
        k.xyy*sdf(p+t*k.xyy) + 
        k.yyx*sdf(p+t*k.yyx) + 
        k.yxy*sdf(p+t*k.yxy) + 
        k.xxx*sdf(p+t*k.xxx)
    );
}

vec2 raymarch(vec3 o, vec3 d, float jitter)
{ 
    float t = jitter * 2.0;
    float a = 0.0;
    float g = MAX_DIST;
    int dr = 0;

    for (int i = 0; i < 100; i++)
    {
        vec3 p = o + d * t;
        float ndt = sdf(p);
        g = (t > 10.0) ? min(g, abs(ndt)) : MAX_DIST;

        if (t >= MAX_DIST) break;

        if (abs(ndt) < MIN_DIST)
        {
            if (dr > MAX_DRAWS) break;
            dr++;

            float f = smoothstep(0.0, 0.3, (p.z * 0.9) / 100.0);
            a += 0.015 * f;
            t += 0.05;
        }
        else
        {
            t += abs(ndt) * 0.8;
        }
    }

    g /= 3.0;
    return vec2(a, max(1.0 - g, 0.0));
}

float dither(vec2 pos)
{
    return fract(52.9829189 * fract(dot(pos, vec2(0.06711056, 0.00583715))));
}

vec3 render(vec2 U)
{
    vec2 ires = iResolution.xy;
    vec2 uv = U / ires;

    vec3 o = vec3(0.0);
    vec3 d = vec3((U - 0.5 * ires) / ires.y, 1.0);

    vec2 mg = raymarch(o, d, dither(U));
    float m = mg.x;

    float q = iDate.w / 86400.0;
    float p = sin((2.*M_PI * q) + (.5*M_PI));

    vec3 l1 = mix(vec3(0.040, 0.008, 0.080), vec3(0.015, 0.003, 0.035), p);
    vec3 l2 = mix(vec3(0.025, 0.005, 0.055), vec3(0.010, 0.002, 0.025), p);
    vec3 l3 = mix(vec3(0.008, 0.025, 0.040), vec3(0.006, 0.010, 0.018), p);
    vec3 l4 = mix(vec3(0.012, 0.035, 0.055), vec3(0.008, 0.015, 0.025), p);

    vec3 c = mix(
        mix(l1, l2, uv.x),
        mix(l3, l4, uv.x),
        uv.y
    );

    c = mix(c, vec3(1.0), clamp(m, 0.0, 1.0));

    #ifdef DUST
    c += get_dust(uv, vec2(2000.0), mg.y) * 0.3;
    #endif

    return c;
}

void main()
{
    vec2 U = vUv * iResolution.xy;
    
    vec3 totalColor = vec3(0.0);

    #if AA > 1
    for (int m = 0; m < AA; m++) {
        for (int n = 0; n < AA; n++) {
            vec2 offset = vec2(float(m), float(n)) / float(AA) - 0.5;
            totalColor += render(U + offset);
        }
    }
    totalColor /= float(AA * AA);
    #else
    totalColor = render(U);
    #endif

    totalColor += (dither(U) - 0.5) / 255.0;

    fragColor = vec4(totalColor, 1.0);
}
`;
