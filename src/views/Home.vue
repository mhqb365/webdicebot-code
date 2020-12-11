<template>
  <div>
    <p>
      ☛ Code store is public for Web DiceBot user and shared by any user. There
      is no guarantee of safety. Consider and test before using
    </p>

    <router-link to="/vip">
      <button type="button" class="btn btn-warning mb-3">VIP Store</button>
    </router-link>

    <p>Total codes: {{ totalDocs }} | Total pages: {{ totalPages }}</p>

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

    <div v-if="isLoading" class="spinner-border"></div>

    <div v-else class="row">
      <div
        class="col-sm-12 col-md-3 mb-3"
        v-for="code in codes"
        :key="code.name"
      >
        <div class="card p-2">
          <b>
            <span class="badge badge-warning">{{ code.type }}</span>
            <span class="text-primary">{{ code.name }}</span>
            share by
            <span class="text-primary">{{ code.author }}</span>
          </b>

          <hr />

          <div class="form-group">
            <textarea
              class="form-control"
              rows="6"
              v-model="code.content"
            ></textarea>
          </div>

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
      isLoading: false,
      page: 1,
      codes: [],
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
    };
  },
  mounted: function () {
    this.checkLicense();
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
    enterLicense: function () {
      let license = prompt("Enter your license");
      if (!license) return this.notify("Enter your license", false);

      localStorage.setItem("license", license);

      window.location.reload();
    },
    checkLicense: function () {
      if (!localStorage.getItem("license")) return this.enterLicense();

      this.fetch();
    },
    fetch: function (page) {
      this.isLoading = true;
      axios({
        url:
          API_URL +
          "/code?license=" +
          localStorage.getItem("license") +
          "&page=" +
          `${page ? page : this.page}` +
          "&limit=9",
        method: "GET",
      }).then((response) => {
        // console.log(response.data);
        this.isLoading = false;
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