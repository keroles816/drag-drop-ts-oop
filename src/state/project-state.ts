
namespace App {

type Listener<T> =(items:T[])=>void

  
  //project State Management


     abstract class State<T>{ 
       protected lisners :Listener<T>[]=[];

        addListener(lisenFn:Listener<T>){
          this.lisners.push(lisenFn);
                 
        }

      }



 export class ProjectState extends State<Project>{
    
    private projects:Project[]=[];
    private static instance:ProjectState;


    private constructor(){
      super();
      
    }

      //this function allow me to return a propary in the class type of the clas
      //its means i can with this method I can call the  class methods
      //with the object of this methoud because I both side It will retun the 
      //istance for me meaning class of the class
    static getInstance(){
      if(this.instance){
        return this.instance
      }else{
        this.instance = new ProjectState();
        return this.instance
      }
    }
    
    // it receivce a function and add it to the lisners array

   // and it returns the copy of the array
   

  
    addProject(title:string,description:string, numofPeople:number){
      const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numofPeople,
      ProjectStatus.Active
      );

      this.projects.push(newProject);
      this.updateListener()
     

    }
    moveProject(projectId:string,newState:ProjectStatus){

      const project =this.projects.find(prj=>prj.id===projectId)
      if(project && project.status!==newState){
        project.status=newState
        this.updateListener()
      }
    }
    private updateListener(){
      for(const lisnerFn of this.lisners){
        //it returns the copy of the array
        lisnerFn(this.projects.slice());
        //and stored in the lisners array
        
      }
    }
      
   
  }

 export const projectState = ProjectState.getInstance();
}