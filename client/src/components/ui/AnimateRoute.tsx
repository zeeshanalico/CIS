import { useLocation } from 'react-router-dom';
import { AnimateY, AnimateX } from './AnimatePage';
interface Props {
  fullPath: string;
  element: JSX.Element;
}
export const AnimateRouteY = ({ fullPath, element }: Props) => {
  const location = useLocation();
  const isAnimating = location.pathname === fullPath;

  return isAnimating ? <AnimateY>{element}</AnimateY> : element;
};

export const AnimateRouteX = ({ fullPath, element }: Props) => {
  const location = useLocation();

  const isAnimating = location.pathname === fullPath;
  console.log(isAnimating);


  return isAnimating ? <AnimateX>{element}</AnimateX> : element;
};

