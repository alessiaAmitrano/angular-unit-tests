import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from, empty, throwError, } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });
  it('should set todos property with the items return from the server', () => {
    const todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });
    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });
  it('should call the server to save the changes when a todo is added', () => {
    // in this test we just need to test that the add method has been called
    const spy = spyOn(service, 'add').and.callFake(t => {
      return empty();
    });
    component.add();
    expect(spy).toHaveBeenCalled();
  });
  it('should add the new todo from the server', () => {
    const todo = { id: 1};
    // in this test we have to verify that the todo is returned from the server
    // const spy = spyOn(service, 'add').and.callFake(t => {
    //   return from([todo]);
    // });
    // alternative
    const spy = spyOn(service, 'add').and.returnValue(from([todo]));
    component.add();
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });
  it('should set the message if the server returns an error when adding a todo', () => {
   const error = 'errore';
    const spy = spyOn(service, 'add').and.returnValue(throwError(error));
    component.add();
    expect(component.message).toBe(error);
  });
  it('should call the server to delete a todo if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);

  });
  it('should NOT call the server to delete a todo if the user declines', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);
    expect(spy).not.toHaveBeenCalled();

  });
});
