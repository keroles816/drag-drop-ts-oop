
/// <reference path="base-componet.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project-model.ts" />

 namespace App{

  export class ProjectListItems extends
 Component<HTMLUListElement,HTMLLIElement> implements Draggable{
 //proparty assign project comming from projectList class
 private project:Project
get persons(){
 if(this.project.people===1){
   return '1 person';
 }else{
   return `${this.project.people}persons`
 }

}
 constructor( hostId:string, project:Project){
   super("single-project",hostId,false,project.id);
   this.project=project

   this.configure();
   this.renderContent();

 }

 @autobind
 dragStartHandler(event: DragEvent){
   
   event.dataTransfer!.setData('text/plain',this.project.id);
   console.log(event)
   event.dataTransfer!.effectAllowed='move'
 }
 dragEndHandler(_: DragEvent) {
   
 }
 configure() {
   this.element.addEventListener("dragstart",this.dragStartHandler)
   this.element.addEventListener("dragend",this.dragEndHandler)

   
 }
 renderContent() {
   this.element.querySelector('h2')!.textContent=this.project.title
   this.element.querySelector('h3')!
   .textContent=this.persons+'assigned'; 
   this.element.querySelector('p')!.textContent=this.project.description
   
 }
}
 

 }
