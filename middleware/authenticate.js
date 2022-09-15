export default function auth({ redirect }) {
  if (!localStorage.SecretKey) {
    return redirect("/");
  }
  // console.log("middleware");
}
