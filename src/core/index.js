import _ from 'lodash';
import styles from '../style/index.scss';
import undoIcon from '../svg/undo_48px.svg';
import redoIcon from '../svg/redo_48px.svg';
import boldIcon from '../svg/format_bold_48px.svg';
import italicIcon from '../svg/format_ital_black.svg';
import underlineIcon from '../svg/format_underline_48px.svg';
import strikeThroughIcon from '../svg/format_strikethrough_48px.svg';
import alignLeftIcon from '../svg/format_align_left_48px.svg';
import alignRightIcon from '../svg/format_align_right_48px.svg';
import alignCenterIcon from '../svg/format_align_center_48px.svg';
import alignJustifyIcon from '../svg/format_align_justify_48px.svg';
import orderedListIcon from '../svg/format_list_numbered_48px.svg';
import unorderedListIcon from '../svg/format_list_bulleted_48px.svg';
import blockquoteIcon from '../svg/format_quote_48px.svg';
import codeIcon from '../svg/code_48px.svg';
import sizeIcon from '../svg/format_size_48px.svg';

const iconMap = {
  undo: undoIcon,
  redo: redoIcon,
  bold: boldIcon,
  italic: italicIcon,
  underline: underlineIcon,
  strikeThrough: strikeThroughIcon,
  alignLeft: alignLeftIcon,
  alignRight: alignRightIcon,
  alignCenter: alignCenterIcon,
  alignJustify: alignJustifyIcon,
  orderedList: orderedListIcon,
  unorderedList: unorderedListIcon,
  blockquote: blockquoteIcon,
  code: codeIcon,
  head: sizeIcon
}

class Lego {
  constructor(element) {
    if(typeof element === undefined) {
      throw new Error(`querySelector is required`);
    }
    this.rootElement = null;
    if(typeof element === 'string') {
      this.rootElement = document.querySelector(element);
    }else if(typeof element === 'object' && element instanceof Element) {
      this.rootElement = element;
    }
    this.uniqueId = _.uniqueId(`lego_`);
    this.config = {
      toolbar: true,
      menus: [
        [
          { action: 'undo', toolTip: '撤销' },
          { action: 'redo', toolTip: '重做' },
        ],
        [
          { action: 'head', toolTip: '标题' },
        ],
        [
          { action: 'bold', toolTip: '加粗' },
          { action: 'italic', toolTip: '斜体' },
          { action: 'underline', toolTip: '下划线' },
          { action: 'strikeThrough', toolTip: '删除线' },
        ],
        [
          { action: 'alignJustify', toolTip: '两端对齐' },
          { action: 'alignLeft', toolTip: '居左对齐' },
          { action: 'alignRight', toolTip: '居右对齐' },
          { action: 'alignCenter', toolTip: '居中对齐' },
        ],
        [
          { action: 'orderedList', toolTip: '有序列表' },
          { action: 'unorderedList', toolTip: '无序列表' },
          { action: 'blockquote', toolTip: '引用' },
          { action: 'code', toolTip: '代码' },
        ]
      ]
    };
  }

  handleEvent(eventType, e) {
    eventType = eventType.toUpperCase();
    e.preventDefault();
    switch(eventType) {
      case 'KEYDOWN':
        
      break;
      case 'KEYUP':
        
      break;
      case 'KEYPRESS':
        
      break;
    }
  }
  
  initToolbar() {
    const legoMain = this.legoMain;
    const toolbar = document.createElement('DIV');
    toolbar.className = styles.toolbar;
    legoMain.parentNode.insertBefore(toolbar, legoMain);
    const { menus } = this.config;
    const htmlStr = menus.map( group =>  `<ul class="${styles.toolbarGroup}">
      ${
        group.map( item => `<li><span>${item.toolTip}</span><img src=${iconMap[item.action]}/></li>`).join('')
      }
    </ul>`).join('');
    toolbar.innerHTML = htmlStr;
  }

  initFrame() {
    const rootElement = this.rootElement;
    const legoContanier = document.createElement('DIV');
    const legoMain = document.createElement('DIV');
    legoContanier.className = styles.legoContanier;
    legoMain.className = styles.legoMain;
    legoMain.contentEditable = true;
    legoMain.addEventListener('keydown', this.handleEvent.bind(this, 'keydown'));
    legoMain.addEventListener('keyup', this.handleEvent.bind(this, 'keyup'));
    legoMain.addEventListener('keypress', this.handleEvent.bind(this, 'keypress'));
    legoContanier.appendChild(legoMain);
    rootElement.appendChild(legoContanier);
    this.legoContanier = legoContanier;
    this.legoMain = legoMain;
  }

  create() {
    const { toolbar } = this.config;
    this.initFrame();
    toolbar && this.initToolbar();
  }
}

const editor = new Lego('#lego');
editor.create();