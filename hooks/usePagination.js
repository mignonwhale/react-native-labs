import { useCallback, useContext, useState } from "react";
import AppContext from "../components/AppContext";

/**
 * 페이지네이션 훅
 *
 * @param {function} fetchDataFunction 데이터 조회 함수
 * @param {number} perPage 한 페이지당 데이터 수
 * @param {string} firstDepthObj 데이터 조회 함수의 리턴 데이터의 첫번째 depth ex.portfolios, likes
 * @param {string} (optional) memberNo 회원번호
 *
 * @returns {array} data 조회된 목록 데이터
 * @returns {boolean} loading 로딩중 여부, 로딩 인티케이터 표시 여부
 * @returns {boolean} hasMore 다음 페이지 존재 여부
 * @returns {function} loadMore 다음 페이지 로드 콜백힘수
 * @returns {boolean} refreshing 새로고침 여부, 새로고침 인티케이터 표시 여부
 * @returns {function} refresh 새로고침 콜백함수
 */
const usePagination = (fetchDataFunction, perPage, firstDepthObj, memberNo) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * 데이터 로드
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 목록 조회
    const params = { paging: { page: page, perPage: perPage } };
    const { success, message, data: _data } = await fetchDataFunction(params, memberNo);
    if (!success) {
      appContext.alert({ message });
      return;
    }

    // 데이터 리턴
    let newData = _data[firstDepthObj].list || [];
    let paging = _data[firstDepthObj].paging || {};

    // 데이터 없음
    if (paging.totalCount === 0) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    // 마지막 페이지
    if (paging.size < perPage) {
      setHasMore(false);
    }

    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  }, [loading, hasMore, page, perPage, fetchDataFunction]);

  /**
   * 새로고침
   */
  const refresh = useCallback(async () => {
    setRefreshing(true);
    setHasMore(true);
    setData([]);
    const newPage = 1;
    setPage(newPage);

    setLoading(true);

    // 첫 페이지 데이터 로드 로직
    const params = { paging: { page: newPage, perPage: perPage } };
    const { success, data: _data } = await fetchDataFunction(params, memberNo);
    if (!success) {
      appContext.alert({ message });
      return;
    }

    // 데이터 리턴
    let newData = _data[firstDepthObj].list || [];
    let paging = _data[firstDepthObj].paging || {};

    // 데이터 없음
    if (paging.totalCount === 0) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    // 마지막 페이지
    if (paging.size < perPage) {
      setHasMore(false);
    }

    setData(newData);
    setPage((prevPage) => prevPage + 1);
    setRefreshing(false);
    setLoading(false);
  }, [refreshing, hasMore, page, perPage, fetchDataFunction]);

  return { data, loading, hasMore, loadMore, refreshing, refresh };
};

export default usePagination;
