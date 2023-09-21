import ContentLoader from "react-content-loader";

const HomeSkeleton = (props: object) => (
  <ContentLoader
    speed={3}
    width={500}
    height={500}
    viewBox="0 0 500 500"
    backgroundColor="#340034"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="14" y="27" rx="3" ry="3" width="276" height="215" />
  </ContentLoader>
);

export default HomeSkeleton;
