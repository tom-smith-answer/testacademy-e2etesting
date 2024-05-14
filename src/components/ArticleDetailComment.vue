<template>
  <div class="card">
    <div class="card-block"
    data-test="comment">
      <p class="card-text" :data-test="comment.body">
        {{ comment.body }}
      </p>
    </div>

    <div class="card-footer" data-test="comment-footer">
      <AppLink
        name="profile"
        :params="{ username: comment.author.username }"
        class="comment-author"
      >
        <img
          :src="comment.author.image"
          class="comment-author-img"
          data-test="comment-author-pic"
          :alt="comment.author.username"
        >
      </AppLink>

      &nbsp;

      <AppLink
        name="profile"
        :params="{ username: comment.author.username }"
        class="comment-author"
        data-test="comment-author"
      >
        {{ comment.author.username }}
      </AppLink>

      <span class="date-posted"
      data-test="comment-date">{{ (new Date(comment.createdAt)).toLocaleDateString('en-US') }}</span>

      <span class="mod-options" data-test="delete-comment-btn">
        <i
          v-if="showRemove"
          tabindex="0"
          role="button"
          aria-label="Delete comment"
          class="ion-trash-a"
          @click="emit('remove-comment')"
          @keypress.enter="emit('remove-comment')"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from 'src/services/api'

interface Props {
  comment: Comment
  username?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove-comment'): boolean
}>()

const showRemove = computed(() => props.username !== undefined && props.username === props.comment.author.username)
</script>
