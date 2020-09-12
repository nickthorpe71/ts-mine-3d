import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

//enum for states
enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 }

class App {
  // General Entire Application
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;

  private _state: number = 0;

  constructor() {
    // create the canvas html element and attach it to the webpage
    this._canvas = this._createCanvas();

    // initialize babylon scene and engine
    this._engine = new Engine(this._canvas, true);
    this._scene = new Scene(this._engine);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
    camera.attachControl(this._canvas, true);
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(2, 1, 0), this._scene);
    var cube: Mesh = MeshBuilder.CreateBox("cube", { size: 1 }, this._scene);
    var cube2: Mesh = MeshBuilder.CreateBox("cube2", { size: 1 }, this._scene);
    cube.setPositionWithLocalVector(new Vector3(0, 0, 0));
    cube2.setPositionWithLocalVector(new Vector3(1, 0, 0));

    // let overCube: Mesh[][] = [];

    // for (let row = 0; row < 3; row++) {
    //   overCube.push([]);
    //   for (let col = 0; col < 3; row++) {
    //     overCube[row][col] = MeshBuilder.CreateBox(`cube:${row}-${col}`, { size: 1 }, this._scene);
    //     overCube[row][col].setPositionWithLocalVector(new Vector3(row, col, 0));
    //   }
    // }

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide();
        } else {
          this._scene.debugLayer.show();
        }
      }
    });

    // run the main render loop
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }

  //set up the canvas
  private _createCanvas(): HTMLCanvasElement {

    //Commented out for development
    document.documentElement.style["overflow"] = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    //create the canvas html element and attach it to the webpage
    this._canvas = document.createElement("canvas");
    this._canvas.style.width = "100%";
    this._canvas.style.height = "100%";
    this._canvas.id = "gameCanvas";
    document.body.appendChild(this._canvas);

    return this._canvas;
  }

}
new App();