import ContentLoader from "react-content-loader";

const HomeSkeleton = (props: object) => (
  <ContentLoader
    speed={3}
    width={210}
    height={210}
    viewBox="0 0 600 480"
    backgroundColor="#340034"
    foregroundColor="#b9b9b9"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="1000" height="1000" />
  </ContentLoader>
);

export default HomeSkeleton;
