/// <reference path="base-componet.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />



    namespace App{


   export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
      
        constructor() {
          super('project-input', 'app', true, 'user-input');
          this.titleInputElement = this.element.querySelector(
            '#title'
          ) as HTMLInputElement;
          this.descriptionInputElement = this.element.querySelector(
            '#description'
          ) as HTMLInputElement;
          this.peopleInputElement = this.element.querySelector(
            '#people'
          ) as HTMLInputElement;
      
          this.configure();
          
        }
      
    
         private clearInputElements(){
          this.titleInputElement.value='';
          this.descriptionInputElement.value='';
          this.peopleInputElement.value='';
         }
    
        @autobind
        private submitHandler(event: Event) {
          event.preventDefault();
          const userInputs=this.gatherUserInput();
          if(Array.isArray(userInputs)){
            const [title, desc, people]=userInputs;
            projectState.addProject(title,desc,people);
            this.clearInputElements();
          }
         
        }
    
           renderContent(){}
          
         private gatherUserInput():[ string, string, number] | void {
              const enteredTitle = this.titleInputElement.value;
              const enteredDescription = this.descriptionInputElement.value;
              const enteredPeople = this.peopleInputElement.value;
    
    
              const titleValidatable:validatable={
                value:enteredTitle,
                reqired:true,
                minLength:5,
                    
              }
              const descraptionValidatable:validatable={
                value:enteredDescription,
                reqired:true,
                minLength:10,
                    
              }
    
              const peopleValidatable:validatable={
                value:+enteredPeople,
                reqired:true,
                min:1,
                max:20,
                    
              }
    
              if(
                !Validate(titleValidatable)||
                !Validate(descraptionValidatable)||
                !Validate(peopleValidatable)
              ){
                alert('Invalid input, please try again!');
                return;
              }else{
                return [enteredTitle, enteredDescription, +enteredPeople];
              }
         }
    
         configure() {
          this.element.addEventListener('submit', this.submitHandler);
        
        }
      
      
      }

}