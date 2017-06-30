import { Component, Component as NgComponent, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AngularBaseComponentController, AngularCMSComponent } from "@smallstack/core-client";
import { ComponentSocket, ComponentSocketType, InitializationAware, IOC, LocalizationService, SocketEventAware } from "@smallstack/core-common";
import marked from "marked";
import * as _ from "underscore";

export class MarkdownComponent extends AngularBaseComponentController implements SocketEventAware, InitializationAware {

    public html: string;

    public afterInitialization() {
        
    }

    public onSocketEvent(socketName: string, socketData: any) {
        if (socketName === "markdown")
            this.renderContent(socketData);
        else
            throw new Error("Unknown Socket: " + socketName);
    }

    private renderContent(markdownContent: string) {
        if (typeof markdownContent === "string") {
            const md = marked.setOptions({
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: true,
                sanitize: true,
                smartLists: true,
                smartypants: true
            });
            this.html = md.parse(markdownContent);
        }
    }
}

@Component({
    template: "nativescript component"
})
export class NSMarkdownComponent extends MarkdownComponent { }

@Component({
    template: "web component"
})
export class WebMarkdownComponent extends MarkdownComponent { }

@Component({
    template: "editor component"
})
export class EditorMarkdownComponent extends MarkdownComponent { }


AngularCMSComponent.new("MarkdownComponent")
    .setNativescriptComponent(NSMarkdownComponent)
    .setEditorComponent(EditorMarkdownComponent)
    .setWebComponent(WebMarkdownComponent)
    .addSocket(ComponentSocket.createInput("markdown", ComponentSocketType.STRING))
    .register();
