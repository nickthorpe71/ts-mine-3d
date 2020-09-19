import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Color3, Material, StandardMaterial, PointerEventTypes } from "@babylonjs/core";
import { clipPlaneFragment } from "@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragment";

class App {
  // General Entire Application
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;

  constructor() {
    // create the canvas html element and attach it to the webpage
    this._canvas = this._createCanvas();

    // initialize babylon scene and engine
    this._engine = new Engine(this._canvas, true);
    this._scene = new Scene(this._engine);

    var camera = new ArcRotateCamera("Camera", 5 * Math.PI / 2, Math.PI / 4, 60, new Vector3(2, 2, 2), this._scene);
    camera.attachControl(this._canvas, true);
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(2, 1, 0), this._scene);
    light1.intensity = 1;

    let x: number = 4;
    let y: number = 4;
    let z: number = 4;

    let overCube: Mesh[][] = [];
    let colors: Material[] = [];

    //https://doc.babylonjs.com/babylon101/materials
    let whiteMat = new StandardMaterial('White', this._scene);
    whiteMat.diffuseColor = new Color3(1, 1, 1);
    whiteMat.specularColor = new Color3(1, 1, 1);
    whiteMat.emissiveColor = new Color3(1, 1, 1);
    whiteMat.ambientColor = new Color3(1, 1, 1);

    let blackMat = new StandardMaterial('Black', this._scene);
    whiteMat.diffuseColor = new Color3(0, 0, 0);
    whiteMat.specularColor = new Color3(0, 0, 0);
    whiteMat.emissiveColor = new Color3(0, 0, 0);
    whiteMat.ambientColor = new Color3(0, 0, 0);

    let otherMat = new StandardMaterial('Grey', this._scene);
    whiteMat.diffuseColor = new Color3(2, 2, 2);
    whiteMat.specularColor = new Color3(2, 2, 2);
    whiteMat.emissiveColor = new Color3(2, 2, 2);
    whiteMat.ambientColor = new Color3(2, 2, 2);

    colors.push(whiteMat);
    colors.push(blackMat);
    colors.push(otherMat);

    for (let row = 0; row < x; row++) {
      let meshes: Mesh[] = [];
      overCube.push(meshes);
      for (let col = 0; col < y; col++) {
        for (let depth = 0; depth < z; depth++) {
          overCube[row][col] = MeshBuilder.CreateBox(`cube:${row}${col}${depth}`, { size: 1 }, this._scene);
          overCube[row][col].setPositionWithLocalVector(new Vector3(row, col, depth));
          overCube[row][col].material = colors[0];
        }
      }
    }

    this._scene.onPointerDown = function (ev, pickResult) {
      if (pickResult.hit) {

        var box = pickResult.pickedMesh;

        console.log(box)
        // box.isVisible = false;

        if (ev.button === 0) {
          console.log('left click');
          box.material = colors[1];
        }

        if (ev.button === 2) {
          console.log('right click');
          box.material = colors[0];
        }

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

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

new App();