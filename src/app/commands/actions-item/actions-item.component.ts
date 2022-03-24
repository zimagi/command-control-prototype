import { Component, Input, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-actions-item',
  templateUrl: './actions-item.component.html',
  styleUrls: ['./actions-item.component.scss'],
})
export class ActionsItemComponent implements OnInit {
  @Input() command: any = '';
  @Input() actions: any = [];
  saniTree: any;
  tree: string = '';
  levels: number = 0;
  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.buildTree(this.actions, '');
  }
  genId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  buildTree(actions: any, child: any) {
    // console.log('-----' + this.command + '-' + child + '-----');

    if (actions._type === 'link') {
      this.tree =
        '<div class="border-bottom"><a href="../#/command/' +
        this.command +
        '" class="tree-lnk">' +
        this.command +
        '</a></div>';
    } else {
      let accordionId = 'acc-' + this.genId();
      this.tree +=
        '<div class="accordion accordion-flush" id="' + accordionId + '">';
      let c = 1;
      // Parse obj
      for (let [key, value] of Object.entries(actions)) {
        let obj: any = value;
        // console.log(`${key}: ${value}` + 'type: ' + obj._type);
        if (obj._type === 'link') {
          this.tree +=
            '<div class="border-bottom"><a onClick="goTo(\'' +
            this.command +
            '-' +
            key +
            '\')" class="tree-lnk">' +
            key +
            '</a></div>';
          // this.tree +=
          //   '<div class="border-bottom"><a href="../#/command/' +
          //   this.command +
          //   '/' +
          //   key +
          //   '" class="tree-lnk">' +
          //   key +
          //   '</a></div>';
        }
        if (obj._type === undefined) {
          let accordionItemId = accordionId + '-' + c;
          let idSub: any = this.command + '-' + key + '-' + this.levels;
          // New accordion
          this.tree +=
            '<div class="accordion-item"><strong class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
            accordionItemId +
            '" aria-expanded="false" aria-controls="' +
            accordionItemId +
            '">' +
            key +
            '</button></strong>' +
            '<div id="' +
            accordionItemId +
            '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#' +
            accordionId +
            '"><div class="accordion-body">' +
            this.buildChildren(value, key) +
            '</div></div></div>';

          c++;
        }
      }
      this.tree += '</div>';
    }
    this.saniTree = this.sanitizer.bypassSecurityTrustHtml(this.tree);
  }
  buildChildren(treeChildren: any, parentKey: any) {
    // console.log(treeChildren);
    // Increment levels
    this.levels++;
    let result = '';
    let accordionId = 'acc-' + this.genId();
    let c = 1;
    // let result = '<ul class="children">';
    // if (obj._type === 'link') {
    //   result += '<a href="#" class="">' + this.command + '</a>';
    // } else {
    // Parse obj
    for (let [key, value] of Object.entries(treeChildren)) {
      let obj: any = value;
      // console.log(`${key}: ${value}` + ' type: ' + obj._type);
      if (obj._type === 'link') {
        result +=
          '<div class="border-bottom"><a onClick="goTo(\'' +
          this.command +
          '-' +
          parentKey +
          '-' +
          key +
          '\')" class="tree-lnk">' +
          key +
          '</a></div>';
      }
      if (obj._type === undefined) {
        result +=
          '<div class="accordion accordion-flush" id="' + accordionId + '">';
        // Increment levels
        // this.levels++;
        let accordionItemId = accordionId + '-' + c;
        let idSub: any = this.command + '-' + key + '-' + this.levels;
        // New accordion
        // result +=
        //   '<ul class="tree-parent ' +
        //   idSub +
        //   '"><li>' +
        //   key +
        //   this.buildChildren(value) +
        //   '</li></ul>';

        result +=
          '<div class="accordion-item"><strong class="accordion-header"><button class="accordion-button  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
          accordionItemId +
          '" aria-expanded="false" aria-controls="' +
          accordionItemId +
          '">' +
          key +
          '</button></strong>' +
          '<div id="' +
          accordionItemId +
          '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#' +
          accordionId +
          '"><div class="accordion-body">' +
          this.buildChildren(value, parentKey + '-' + key) +
          '</div></div></div>';

        result += '</div>';
      }
    }
    // }
    // result += '</ul>';
    return result;
  }
  goTo(action: any, noAction: boolean) {
    setTimeout(() => {
      $('#begin').hide();
    }, 200);

    this.router.navigate(['/commands/' + this.command + '-' + action]);
  }
}
