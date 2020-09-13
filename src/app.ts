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

    var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60, Vector3.Zero(), this._scene);
    camera.attachControl(this._canvas, true);
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(2, 1, 0), this._scene);

    let x = 4;
    let y = 4;
    let z = 4;

    let overCube: Mesh[][] = [];

    for (let row = 0; row < x; row++) {
      let meshes: Mesh[] = [];
      overCube.push(meshes);
      for (let col = 0; col < y; col++) {
        for (let depth = 0; depth < z; depth++) {
          overCube[row][col] = MeshBuilder.CreateBox(`cube:${row}${col}${depth}`, { size: 1 }, this._scene);
          overCube[row][col].setPositionWithLocalVector(new Vector3(row, col, depth));
        }
      }
    }

    let faceColors = [];

    this._scene.onPointerDown = function (ev, pickResult) {
      if (pickResult.hit) {
        var box = pickResult.pickedMesh;
        console.log(box)
        box.isVisible = false;
      }
    }

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