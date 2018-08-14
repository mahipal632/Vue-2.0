<template>
  <div class="todos-wrapper">
    <h1>Todos</h1>
    <input
        type="text"
        class="todo-input"
        placeholder="Enter a todo item"
        v-model="newTodo"
        @keyup="addItem($event)" />

    <ul class="todo-list">
        <li
            :id="todo.id"
            v-bind:key="todo.id"
            v-if="filtered.length > 0"
            v-for="todo in filtered">
            <input type="checkbox" v-model="todo.completed" />
            <label :class="{completed: todo.completed}">{{ todo.title }}</label>
            <button @click="removeItem(todo)">remove</button>
            </li>
    </ul>

    <p v-if="filtered.length === 0">No items</p>

    <footer>
        <div class="remaining" v-if="remaining > 0">{{ remaining }} items left</div>
        <div class="group">
            <button :disabled="filtered.length < 1" :class="{active: visibility === 'all'}"  @click="markFilter('all')">all</button>
            <button :disabled="filtered.length < 1" :class="{active: visibility === 'active'}"  @click="markFilter('active')">active</button>
            <button :disabled="filtered.length < 1" :class="{active: visibility === 'completed'}"  @click="markFilter('completed')">completed</button>
        </div>
    </footer>
  </div>
</template>

<script>
import { uuid } from "../utils.js";

// visibility filters
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
};

export default {
  name: "TodoList",
  data: () => ({
    newTodo: "",
    todos: [],
    visibility: "all"
  }),
  computed: {
    filtered() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    }
  },
  methods: {
    addItem(e) {
      let title = this.newTodo && this.newTodo.trim();
      if (!title) {
        return;
      }

      if (e.which === 13) {
        this.todos.push({
          id: uuid(),
          title,
          completed: false
        });

        this.newTodo = "";
      }
    },
    removeItem(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    markFilter(visibility) {
      this.visibility = visibility;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todos-wrapper {
  width: 400px;
  margin: 0 auto;
  padding: 16px;
  background: #ecf0f1;
  display: flex;
  flex-direction: column;
}
.todo-input {
  padding: 4px;
  background-color: whitesmoke;
  border-radius: 2px;
  border: 1px #bdc3c7 solid;
  outline: none;
  display: flex;
  flex: 1;
}
.todo-list {
  margin: 0;
  padding: 4px 0;
  text-align: left;
  li {
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px #bdc3c7 solid;
    label {
      display: flex;
      flex: 1;
      &.completed {
        text-decoration: line-through;
      }
    }
    button {
      margin: auto;
    }
  }
}

footer {
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 16px;

  .remaining,
  .group {
    min-height: 32px;
  }

  .remaining {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
  }

  .group {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    button {
      margin-right: 8px;
      padding: 4px 8px;
      background: whitesmoke;
      border: 1px #c0392b solid;
      border-radius: 2px;

      &.active {
        background-color: #c0392b;
        color: whitesmoke;
      }

      &:disabled {
        background-color: transparent;
        border-color: #bdc3c7;
        color: inherit;
      }
    }
  }
}
</style>
