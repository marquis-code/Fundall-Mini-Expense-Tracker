import { ref } from 'vue'
const search = ref('')
export const useSearch = () => {
  const setSearch = (data) => {
   search.value = data
  }
  return {search, setSearch}
}
