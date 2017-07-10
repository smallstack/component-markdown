import { AngularBaseComponentController, AngularCMSComponent, AngularComponent } from "@smallstack/core-client";
import { ComponentSocket, ComponentSocketType, InitializationAware, IOC, LocalizationService, SocketEventAware } from "@smallstack/core-common";
import marked from "marked";
import * as _ from "underscore";

// TODO: get angular working in here without losing metadata data

// declare var SimpleMDE: any;

// export class MarkdownComponentEditor extends AngularBaseComponentController implements SocketEventAware, InitializationAware {


//     public markdownEditorDiv: any;

//     public html: string;

//     private markdownEditor: any;

//     public afterInitialization() {
//         this.markdownEditor = new SimpleMDE({
//             element: this.markdownEditorDiv.nativeElement,
//             spellChecker: false,
//             toolbar: ["bold", "italic", "heading", "|", "unordered-list", "ordered-list", "|", "code", "|", "guide"]
//         });
//         this.renderContent(this.getData("data"));
//     }

//     public onSocketEvent(socketName: string, socketData: any) {
//         if (socketName === "markdown")
//             this.renderContent(socketData);
//         else
//             throw new Error("Unknown Socket: " + socketName);
//     }

//     private renderContent(markdownContent: string) {
//         if (typeof markdownContent === "string") {
//             const md = marked.setOptions({
//                 gfm: true,
//                 tables: true,
//                 breaks: true,
//                 pedantic: true,
//                 sanitize: true,
//                 smartLists: true,
//                 smartypants: true
//             });
//             this.html = md.parse(markdownContent);
//         }
//     }
// }

export class ViewMarkdownComponent extends AngularBaseComponentController implements InitializationAware {

    public html: string = "Loading...";

    public afterInitialization() {
        const data: any = this.getData("markdown");

        if (typeof data === "string") {
            const md = marked.setOptions({
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: true,
                sanitize: true,
                smartLists: true,
                smartypants: true
            });
            this.html = md.parse(data);
        }
        else
            this.html = "No markdown text given!";
    }
}


AngularComponent.new("ViewMarkdownComponent", ViewMarkdownComponent)
    .setTemplate(`<div [innerHtml]="html"></div>`)
    .register();

AngularComponent.new("NSViewMarkdownComponent", ViewMarkdownComponent)
    .setTemplate(`<HtmlView [html]="html"></HtmlView>`)
    .register();

// AngularComponent.new("MarkdownComponentEditor", MarkdownComponentEditor)
//     .setTemplate(`<div><textarea #markdownEditor></textarea></div><button class="btn btn-primary btn-block" (click)="saveContent()">save</button>`)
//     .register();


AngularCMSComponent.new("MarkdownComponent")
    .setNativescriptComponent("NSViewMarkdownComponent")
    .setEditorComponent("MarkdownComponentEditor")
    .setWebComponent("ViewMarkdownComponent")
    .addSocket(ComponentSocket.createInput("markdown", ComponentSocketType.STRING))
    .register();
