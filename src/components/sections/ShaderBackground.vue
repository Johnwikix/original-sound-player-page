<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    fragmentSource: string
    vertexSource?: string
  }>(),
  {
    vertexSource: `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)

let gl: WebGL2RenderingContext | null = null
let program: WebGLProgram | null = null
let animFrameId = 0
let startTime = 0
let frameCount = 0
let vao: WebGLVertexArrayObject | null = null
let reducedMotion = false
let mql: MediaQueryList | null = null

function compileShader(type: number, source: string): WebGLShader | null {
  if (!gl) return null
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(vertSrc: string, fragSrc: string): WebGLProgram | null {
  if (!gl) return null
  const vert = compileShader(gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl.FRAGMENT_SHADER, fragSrc)
  if (!vert || !frag) return null

  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vert)
  gl.attachShader(prog, frag)
  gl.linkProgram(prog)
  gl.deleteShader(vert)
  gl.deleteShader(frag)

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog))
    return null
  }

  return prog
}

function setupGeometry() {
  if (!gl || !program) return

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1])

  vao = gl.createVertexArray()
  gl.bindVertexArray(vao)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const posLoc = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  gl.bindVertexArray(null)
}

function render() {
  if (!gl || !program || !vao) return

  frameCount++
  const now = performance.now()
  const time = (now - startTime) / 1000
  const d = new Date()
  const secs =
    d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() / 1000

  gl.useProgram(program)

  gl.uniform2f(gl.getUniformLocation(program, 'iResolution'), gl.canvas.width, gl.canvas.height)
  gl.uniform1f(gl.getUniformLocation(program, 'iTime'), time)
  gl.uniform1f(gl.getUniformLocation(program, 'iFrame'), frameCount)
  gl.uniform4f(
    gl.getUniformLocation(program, 'iDate'),
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    secs,
  )

  gl.bindVertexArray(vao)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  gl.bindVertexArray(null)

  animFrameId = requestAnimationFrame(render)
}

function resize() {
  if (!gl || !canvasRef.value) return
  const canvas = canvasRef.value
  const dpr = Math.min(window.devicePixelRatio || 1, 1.4)
  const w = canvas.clientWidth * dpr
  const h = canvas.clientHeight * dpr
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)
  }
}

let resizeObserver: ResizeObserver | null = null

function init() {
  const canvas = canvasRef.value
  if (!canvas) return

  gl = canvas.getContext('webgl2', { alpha: false, antialias: false })
  if (!gl) {
    console.warn('WebGL2 not supported, falling back to CSS background')
    return
  }

  gl.disable(gl.DEPTH_TEST)

  program = createProgram(props.vertexSource, props.fragmentSource)
  if (!program) {
    gl = null
    return
  }

  setupGeometry()
  startTime = performance.now()
  frameCount = 0
  resize()
  if (!reducedMotion) {
    render()
  } else {
    render()
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = 0
    }
  }
}

function cleanup() {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = 0
  }
  if (gl && program) {
    gl.deleteProgram(program)
    program = null
  }
  if (gl && vao) {
    gl.deleteVertexArray(vao)
    vao = null
  }
  gl = null
}

function onVisibilityChange() {
  if (!gl || !program || !vao) return
  if (document.hidden || reducedMotion) {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = 0
    }
  } else {
    if (!animFrameId) {
      render()
    }
  }
}

function onMotionChange(ev: MediaQueryListEvent) {
  reducedMotion = ev.matches
  if (reducedMotion) {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = 0
    }
  } else if (!document.hidden) {
    if (!animFrameId) {
      render()
    }
  }
}

onMounted(() => {
  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = mql.matches
  mql.addEventListener('change', onMotionChange)
  init()
  resizeObserver = new ResizeObserver(resize)
  if (canvasRef.value) {
    resizeObserver.observe(canvasRef.value)
  }
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  cleanup()
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  document.removeEventListener('visibilitychange', onVisibilityChange)
  if (mql) {
    mql.removeEventListener('change', onMotionChange)
  }
})

watch(
  () => props.fragmentSource,
  () => {
    cleanup()
    init()
  },
)
</script>

<template>
  <canvas ref="canvasRef" class="shader-canvas" aria-hidden="true" />
</template>

<style scoped>
.shader-canvas {
  display: block;
  width: 100%;
  height: 100%;
  contain: strict;
}

@media (prefers-reduced-motion: reduce) {
  .shader-canvas {
    display: none;
  }
}
</style>
