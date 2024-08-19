function staffSession() {
  const session = sessionStorage.getItem('isStaff');
  return Boolean((session && session === 'true'))
}

export default staffSession
