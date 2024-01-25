// import styles from './Layout.module.css';
import Header from './header/Header';
// import Cart from '../cart/Cart';
// import {
//   categoriesListAtom,
//   productsListAtom,
// } from '../../stores/productsStore';
import { Outlet } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
// import { trpc } from '../../../trpc/index';
// import { CategoryRead, ProductRead } from '../../../../../library/index';
// import CartNotFound from '../cart/cartNotFound/CartNotFound';
import { useEffect } from 'react';
import Loading from './loading/Loading';
import { loadingAtom } from '../utils/atoms';
const Layout = () => {
  //   const [productsFromDb, setProducts] = useAtom(productsListAtom);
  //   const [categoriesFromDb, setCategories] = useAtom(categoriesListAtom);
  const myProductsAndCategories = async () => {
    // const products: ProductRead[] = await trpc.productsList.query();
    // const categories: CategoryRead[] = await trpc.categoriesList.query();
    // productsFromDb.length === 0 ? setProducts(products) : null;
    // categoriesFromDb.length === 0 ? setCategories(categories) : null;
  };
  //   useEffect(() => {
  //     if (productsFromDb.length === 0 && categoriesFromDb.length === 0) {
  //       myProductsAndCategories();
  //     }
  //   }, [productsFromDb, categoriesFromDb]);
  const loading = useAtomValue(loadingAtom);

  return (
    <div>
      <Header />
      {/* <Cart /> */}
      {/* <CartNotFound /> */}
      {/* {a?<Loading />: <Outlet />} */}
      {loading && <Loading />}

      <Outlet />
    </div>
  );
};
export default Layout;
