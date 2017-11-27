---
title: "Rendering Data"
description: "Foo bar."
buttonTitle: "I rendered the todo items"
parentId: "todo-app"
layout: "tutorial"
time: 90
weight: 5
---

## {$page.title}

First let's prepare the `TodoItem` for consuming the data being passed
from `TodoApp`.

```text/jsx
class TodoItem extends JSXComponent {
	render() {
		// Conditionally adding the 'todo-item-done' class if
		// the todo is done
		let elementClasses = `todo-item${this.props.todo.done ?
			' todo-item-done' : ''}`;

		return (
			<li
				class={elementClasses}
			>
				{this.props.todo.title}
			</li>
		);
	}
}
```

Now that you have some data that needs rendering, and the `TodoItem` is ready to
consume it, you need to iterate over the todos and pass them to the child
components.

```text/jsx
class TodoApp extends JSXComponent {
	render() {
		return (
			<div class="todo-app">
				<ul>
					{this.state.todos.map((todo, index) => {
						return (
							<TodoItem
								index={index}
								todo={todo}
							/>
						);
					})}
				</ul>
			</div>
		);
	}
}
```

This will result in the following markup.

```text/xml
<div class="todo-app">
	<ul>
		<li class="todo-item">Todo 1</li>
		<li class="todo-item">Todo 2</li>
	</ul>
</div>
```
