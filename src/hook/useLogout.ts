import { useEffect } from "react"

function useLogout() {
  useEffect(() => sessionStorage.clear())
}

export default useLogout