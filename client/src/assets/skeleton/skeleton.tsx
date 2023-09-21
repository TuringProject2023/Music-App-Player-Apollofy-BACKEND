import ContentLoader from "react-content-loader"

const LoaderPlaylist = (props: object) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={70}
    viewBox="200 0 2000 500"
    backgroundColor="hsl(349, 76%, 63%)"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="50" y="13" rx="100" ry="50" width="2000" height="280" />     
  </ContentLoader>
)

export default LoaderPlaylist
