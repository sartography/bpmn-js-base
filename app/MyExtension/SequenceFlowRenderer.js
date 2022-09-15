import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { attr as svgAttr } from 'tiny-svg';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

// Setting a high priority level helps us slip in ahead of BPMN.js rules and apply our own instead.
const HIGH_PRIORITY = 1500;

/**
 * Just a simple example that will change the Connections from black to Blue
 */
export default class SequenceFlowRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  /**
   * This tells BPMN.js that this function should be used to render the connections
   * @param element
   * @returns {boolean}
   */
  canRender(element) {
    return is(element, 'bpmn:SequenceFlow');
  }

  /**
   * In this case, we want to override the drawConnection -- because this is a Sequence Flow,
   * this would be drawShape if we were overriding how a Task object was rendered.
   * @param parentNode
   * @param element
   * @returns {*}
   */
  drawConnection(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    //
    svgAttr(shape, 'stroke', 'red');
    return shape;
  }
}

SequenceFlowRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];
