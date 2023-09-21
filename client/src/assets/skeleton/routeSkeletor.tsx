
import ContentLoader from "react-content-loader"

const RouteSkeletor = (props: object) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={1300}

    backgroundColor="rgb(52, 0, 52)"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle rx={100} cx="150" cy="86" r="8" />
    <circle rx={100} cx="194" cy="86" r="8" />
    <circle rx={100} cx="238" cy="86" r="8" />
  </ContentLoader>

)

export default RouteSkeletor

