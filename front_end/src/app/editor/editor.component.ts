import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

const THEME = 'ace/theme/github';
const LANG = 'ace/mode/';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;
  private editorBeautify: { beautify: (arg0: ace.Ace.EditSession) => void; };
  code: string;
  selected: string;
  codeobject: object;
  constructor(private data: DataService, private router: Router) { }

  postCodeReview() {
    this.code = this.codeEditor.getValue();
    this.codeobject = {
      code: this.consoleCode()
    };
    this.data.postCode(this.codeobject).subscribe(
      data => {
        this.router.navigate(['/review']);
      }
    );
  }

  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }
  private consoleCode() {
    this.code = this.codeEditor.getValue();
    console.log(this.code);
  }
  public selectLang(event: any) {
    this.selected = event.target.value;
    console.log(this.selected);
    this.codeEditor.getSession().setMode((LANG + this.selected));
  }
  ngOnInit() {
    ace.require('ace/ext/language_tools');
    this.editorBeautify = ace.require('ace/ext/beautify');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode('');
    this.codeEditor.getSession().setMode((LANG + 'java'));
    this.codeEditor.setShowFoldWidgets(true);
  }

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & {
    enableBasicAutocompletion?: boolean;
  } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }
}
