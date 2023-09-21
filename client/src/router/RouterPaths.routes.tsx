import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import { LandingPage, LoginPage, RegisterPage, StartingPage } from "../pages/index";
import "../App.css";
import RouteSkeletor from "../assets/skeleton/routeSkeletor.tsx";
import { ALBUM, HOME, LANDING, LIBRARY, LOGIN, PLAYER, PLAYERID, PLAYLISTS, PROFILE, REGISTER, STARTING } from "../config/routes/paths.ts";
import { PublicRoute } from "../components/index.ts";
import { ProtectedRoutes } from "../utils/ProtectedRoutes.tsx";
import { useAuth0 } from "@auth0/auth0-react";

const LazyLayout = lazy(() => import("../components/layout/Layout.tsx"));

const LazyHomePage = lazy(() => import("../pages/private/HomePage.tsx"));
const LazyProfilePage = lazy(() => import("../pages/private/ProfilePage.tsx"));
const LazyPLayerPage = lazy(() => import("../pages/private/PlayerPage.tsx"));
const LazyLibraryPage = lazy(() => import("../pages/private/LibraryPage.tsx"));
const LazyPlaylistPage = lazy(() => import("../pages/private/PlaylistPage.tsx"));
const LazyAlbumPage = lazy(() => import("../pages/private/AlbumPage.tsx"));

export const Router = () => {
  const { user } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING} element={<PublicRoute />}>
          <Route index element={<LandingPage />} />
          <Route path={STARTING} element={<StartingPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={REGISTER} element={<RegisterPage />} />
        </Route>
        <Route
          path={HOME}
          element={
            <Suspense fallback={<RouteSkeletor />}>
              <LazyLayout />
            </Suspense>
          }>
          <Route
            index
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyHomePage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={PLAYER}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyPLayerPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={PLAYERID}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyPLayerPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={`${PLAYLISTS}/:id`}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyPlaylistPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={LIBRARY}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyLibraryPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={`${ALBUM}/:id`}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyAlbumPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path={PROFILE}
            element={
              <Suspense fallback={<RouteSkeletor />}>
                <ProtectedRoutes user={user}>
                  <LazyProfilePage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

//  pages:
// - entrada
// - registro
// - app

//  header
//  aside
//  main
// home
// player
// playlists
// profile

//  footer
