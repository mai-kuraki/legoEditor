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
    if(typeof element === undefined || typeof element === null) {
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
          'undo',
          'redo'
        ],
        [
          'head'
        ],
        [
          'bold',
          'italic',
          'underline',
          'strikeThrough'
        ],
        [
          'alignJustify',
          'alignLeft',
          'alignRight',
          'alignCenter'
        ],
        [
          'orderedList',
          'unorderedList',
          'blockquote',
          'code'
        ]
      ]
    };
  }
  
  initToolbar() {
    const legoMain = this.legoMain;
    const toolbar = document.createElement('DIV');
    toolbar.className = styles.toolbar;
    legoMain.parentNode.insertBefore(toolbar, legoMain);
    const { menus } = this.config;
    const htmlStr = menus.map( group =>  `<ul class="${styles.toolbarGroup}">
      ${
        group.map( item => `<li><img src=${iconMap[item]}/></li>`).join('')
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