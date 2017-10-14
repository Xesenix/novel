import * as buffer from 'buffer';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { Observable } from 'rxjs/Rx';
import { ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { mat4 } from '@mapbox/gl-matrix';

@Component({
	selector: 'xes-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
	private view: HTMLCanvasElement;

	@ViewChild('canvas') canvasRef: ElementRef;

	constructor() { }

	ngAfterViewInit() {
		console.log(this.canvasRef);
		const view = this.canvasRef.nativeElement as HTMLCanvasElement;
		view.style.width = '100%';
		view.style.height = '100%';

		const gl: WebGLRenderingContext = this.initContext(view);

		const shaderProgram = this.createShaderProgram(gl, this.getVertexShader(), this.getFragmentShader());
		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
				modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
			},
		};
		const buffers = this.initBuffers(gl);

		Observable.fromEvent(window, 'mousemove')
			.switchMap((ev) => Observable.of(ev, animationFrame))
			.subscribe((event: MouseEvent) => {
				gl.clearColor(1.0, event.clientX / window.innerWidth, event.clientY / window.innerHeight, 1.0);
				// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
				this.drawScene(gl, programInfo, buffers);
			});

		Observable.fromEvent(window, 'resize').throttleTime(100)
			.subscribe((event: Event) => {
				gl.viewport(0, 0, window.innerWidth, window.innerHeight);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			});

	}

	initContext(view): WebGLRenderingContext {
		const gl: WebGLRenderingContext = view.getContext('webgl') || view.getContext('experimental-webgl');
		gl.clearColor(1.0, 0.0, 0.0, 0.5);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		return gl;
	}

	loadShader(gl: WebGLRenderingContext, type: number, source) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	createShaderProgram(gl: WebGLRenderingContext, vertexShaderSrc, fragmentShaderSrc) {
		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			return null;
		}

		return shaderProgram;
	}

	getVertexShader = () => `
	attribute vec4 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
	`

	getFragmentShader = () => `
	void main() {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
	`

	initBuffers(gl: WebGLRenderingContext) {
		const positionBuffer = gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		const positions = [
			1.0, 1.0,
			-1.0, 1.0,
			1.0, -1.0,
			-1.0, -1.0,
		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		return {
			position: positionBuffer
		};
	}

	drawScene(gl: WebGLRenderingContext, programInfo, buffers) {
		// gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const fov = 45 * Math.PI / 180;
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

		const modelViewMatrix = mat4.create();

		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);

		{
			const numComponents = 2;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;

			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset
			);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		}

		gl.useProgram(programInfo.program);

		gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);

		gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

		{
			const offset = 0;
			const vertexCount = 4;
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
		}
	}
}
