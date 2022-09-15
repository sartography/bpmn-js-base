/**
 * This file provides an example of how to hook all of your parts together to create
 * a simple web page that contains your customized BPMN Modeler.
 * There are comments throughout to explain what is happening.
 */


/**
 * IMPORTS - where we load up all the dependencies
 ===============================================
 */

// the BPMN.js libraries
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule} from 'bpmn-js-properties-panel';

// FileSaver helps us build a download button so you can save files you create in the browser.
import FileSaver from 'file-saver';

// This is the diagram that is opened by default.
import diagramXML from '../example.bpmn';

// Here is where we import your library code
import myExtension from './MyExtension';

/**
 * MODELER - Where we instantiate the modeler
 ===============================================
 This is where you will create a BPMN modeler and configure it to load in your extensions.
 */
const modelerEl = document.getElementById('modeler');
const panelEl = document.getElementById('panel');

let bpmnModeler;

// create modeler
try {
  bpmnModeler = new BpmnModeler({
    container: modelerEl,
    propertiesPanel: {
      parent: panelEl,
    },
    additionalModules: [
      myExtension,
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
    ]
  });
} catch (error) {
  if (error.constructor.name === 'AggregateError') {
    console.log(error.message);
    console.log(error.name);
    console.log(error.errors);
  }
  throw error;
}

// import XML
bpmnModeler.importXML(diagramXML).then(() => {});




/**
 * Open and Save Files
 * ===============================================
 * The rest of this stuff is concerned with making it easy to open a BPMN file and save it - these
 * are general tools - nothing very specific to BPMN.io -
 * -----------------------------------------
 */

/**
 * Just a quick bit of code so we can save the XML that is output.
 * Helps for debugging against other libraries (like SpiffWorkflow)
 */
const btn = document.getElementById('downloadButton');
btn.addEventListener('click', (_event) => {
  saveXML();
});
async function saveXML() {
  const { xml } = await bpmnModeler.saveXML({ format: true });
  const blob = new Blob([xml], { type: 'text/xml' });
  FileSaver.saveAs(blob, 'diagram.bpmn');
}

/**
 * Just a quick bit of code so we can open a local XML file
 * Helps for debugging against other libraries (like SpiffWorkflow)
 */
const uploadBtn = document.getElementById('uploadButton');
uploadBtn.addEventListener('click', (_event) => {
  openFile(displayFile);
});

function clickElem(elem) {
  const eventMouse = document.createEvent('MouseEvents');
  eventMouse.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  elem.dispatchEvent(eventMouse);
}

function displayFile(contents) {
  bpmnModeler.importXML(contents).then(() => {});
}

export default function openFile(func) {
  const readFile = function readFileCallback(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function onloadCallback(onloadEvent) {
      const contents = onloadEvent.target.result;
      fileInput.func(contents);
      document.body.removeChild(fileInput);
    };
    reader.readAsText(file);
  };
  let fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.onchange = readFile;
  fileInput.func = func;
  document.body.appendChild(fileInput);
  clickElem(fileInput);
}
