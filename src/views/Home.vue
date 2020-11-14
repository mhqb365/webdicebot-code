<template>
  <div>
    <p>
      ☛ Store is public and shared by anyone. There is no guarantee of safety.
      Consider and test before using
    </p>

    <a href="/add" type="button" class="btn btn-primary mb-3">Share</a>

    <p>Total codes: {{ totalDocs }} | Total page: {{ totalPages }}</p>

    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          v-if="hasPrevPage"
          @click="fetch(page - 1)"
          >Previous</a
        >
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          v-if="hasNextPage"
          @click="fetch(page + 1)"
          >Next</a
        >
      </li>
    </ul>

    <div class="row">
      <div class="col-sm-12 col-md-3" v-for="code in codes" :key="code.name">
        <div class="card p-2">
          <b class="text-primary">{{ code.name }}</b>

          <hr />

          <div class="form-group">
            <textarea
              class="form-control"
              rows="5"
              v-model="code.content"
            ></textarea>
          </div>

          <p>
            By: <span class="text-primary">{{ code.author }}</span>
          </p>

          <button
            type="button"
            class="btn btn-primary btn-block"
            v-clipboard="() => code.content"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      page: 1,
      codes: [],
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
    };
  },
  mounted: function () {
    this.fetch();
  },
  methods: {
    clipboardSuccess: function ({ value, event }) {
      if (value == null) return this.notify("Empty value", false);
      this.notify("Copy success");
    },
    clipboardError: function ({ value, event }) {
      this.notify("Copy fail", false);
    },
    notify: function (message, type = true) {
      this.$swal.fire({
        icon: `${type ? "success" : "error"}`,
        title: message,
        showConfirmButton: false,
        timer: 15e2,
      });
    },
    fetch: function (page) {
      axios({
        url:
          API_URL + "/code?page=" + `${page ? page : this.page}` + "&limit=9",
        method: "GET",
      }).then((response) => {
        // console.log(response.data);
        this.page = response.data.page;
        this.codes = response.data.docs;
        this.totalDocs = response.data.totalDocs;
        this.totalPages = response.data.totalPages;
        this.hasPrevPage = response.data.hasPrevPage;
        this.hasNextPage = response.data.hasNextPage;
      });
    },
  },
};
</script>

<style>
</style>