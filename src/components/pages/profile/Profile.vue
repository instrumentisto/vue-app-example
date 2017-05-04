<template>
  <section id="profile">
    <h1 class="title">{{ $t('profile.title') }}</h1>

    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-12">
          <img v-bind:src="user.image" />
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label" for="userName">
          {{ $t('validation.attributes.name') }}
        </label>
        <div class="col-sm-10">
          <p id="userName" class="form-control-static">{{ user.name }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label" for="userEmail">
          {{ $t('validation.attributes.email') }}
        </label>
        <div class="col-sm-10">
          <p id="userEmail" class="form-control-static">{{ user.email }}</p>
        </div>
      </div>

      <button type="button" class="btn btn-default" v-on:click="logout">
        {{ $t('profile.logout_label') }}
      </button>
    </form>
  </section>
</template>

<script lang="ts" src="./Profile.ts"></script>
