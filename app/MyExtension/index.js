import SequenceFlowRenderer from './SequenceFlowRenderer';

/**
 * This allows us to import "MyExtension" into BPMN.io and
 * get everything that is a part of our extension.  Here
 * we just have a Connection Renderer, but we might have
 * dozens of other slight modifications in other files and
 * directories.
 */
export default {
  __init__: [ 'sequenceFlowRenderer' ],
  sequenceFlowRenderer: [ 'type', SequenceFlowRenderer ],
};

