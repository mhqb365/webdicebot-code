<template>
  <div>
    <a href="/">
      <button type="button" class="btn btn-secondary mb-3">Back</button>
    </a>

    <div class="form-group">
      <label>Type</label>
      <select class="form-control" v-model="type">
        <option>Lua</option>
        <option>Javascript</option>
      </select>
    </div>

    <div class="form-group">
      <label>Code name</label>
      <input type="text" class="form-control" v-model="name" />
    </div>

    <div class="form-group">
      <label>Share by</label>
      <input type="text" class="form-control" v-model="author" />
    </div>

    <div class="form-group">
      <label>Content</label>
      <textarea class="form-control" rows="5" id="content"></textarea>
    </div>

    <button type="button" class="btn btn-primary" @click="add()">Share</button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      name: "",
      type: "Lua",
      content: "",
      author: "",
      simplemde: "",
    };
  },
  mounted: function () {
    // this.add();
    this.simplemde = new SimpleMDE({
      element: document.getElementById("content"),
    });
  },
  methods: {
    notify: function (message, type = true) {
      this.$swal.fire({
        icon: `${type ? "success" : "error"}`,
        title: message,
        showConfirmButton: false,
        timer: 15e2,
      });
    },
    add: function () {
      axios({
        url: API_URL + "/code",
        method: "POST",
        data: {
          name: this.name,
          type: this.type,
          content: this.simplemde.value(),
          author: this.author,
        },
      })
        .then((response) => {
          // console.log(response.data);
          this.notify(response.data.message);

          if (response.data.status) return (window.location.href = "/");
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style>
</style>