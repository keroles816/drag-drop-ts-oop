 
/// <reference path="base-componet.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project-model.ts" />
  namespace App{
   export class ProjectList extends
Component<HTMLDivElement,HTMLElement>
implements DragTarget{

 
 assignedProjects :Project[];

 constructor(private type: "active"| "finished" ){

     super('project-list','app',false,`${type}-projects`)

   this.assignedProjects=[]

   //here we will listen to the project state
   //then we will filter the projects
   //then we will return the relevent projects acording to state to 
   //show in specific div

    this.configure();
   this.renderContent();

 }

@autobind
 dragOverHandler(event: DragEvent){
   if(event.dataTransfer && event.dataTransfer.types[0] ==='text/plain'){
     event.preventDefault();
     const listel = this.element.querySelector('ul')!
     listel.classList.add('droppable')
   }
   
   
 }
 @autobind
 dropHandler(event: DragEvent) {
   const prId = event.dataTransfer!.getData('text/plain');
   projectState.moveProject(prId,
     this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
   );




   
 }
 @autobind
 dragLeaveHandler(_: DragEvent) {
   const  listel = this.element.querySelector('ul')!
   listel.classList.remove('droppable')

 }

 configure(){
   this.element.addEventListener('dragover',this.dragOverHandler)
   this.element.addEventListener('dragleave',this.dragLeaveHandler)
   this.element.addEventListener('drop', this.dropHandler)

   projectState.addListener((projects:Project[])=>{
     const relevantProjects=projects.filter((prj)=>{
       if(this.type==='active'){
         return prj.status===ProjectStatus.Active
       }
       return prj.status===ProjectStatus.Finished

     })
     this.assignedProjects=relevantProjects

     this.renderProjects()

   })


 }
   
private renderProjects(){
   const listEl=document.getElementById(`${this.type}-projects-list`)! as
   HTMLUListElement
   listEl.innerHTML='';
   for(const prjItem of this.assignedProjects){
     new ProjectListItems(this.element.querySelector('ul')!.id,prjItem)
   }
 }


  renderContent(){
   const listId=`${this.type}-projects-list`  
   this.element.querySelector('ul')!.id=listId;
   this.element.querySelector('h2')!.textContent=
   this.type.toUpperCase()+'PROJECTS'

 }

}

  }