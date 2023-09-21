import ContentLoader from "react-content-loader";

const RegisterLoader = (props: object) => (
  <ContentLoader speed={2} width={1200} height={100} viewBox="0 0 1000 400" backgroundColor="#E85973" foregroundColor="#ecebeb" {...props}>
    <rect x="103" y="263" rx="100" ry="800" width="900" height="120" />
    {/* <rect x="105" y="374" rx="50" ry="500" width="1200" height="120" />
    <rect x="105" y="374" rx="50" ry="0" width="1200" height="120" />
    <rect x="105" y="374" rx="50" ry="0" width="1200" height="120" /> */}
  </ContentLoader>
);

export default RegisterLoader;
