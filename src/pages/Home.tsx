import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Pagination } from "@mui/material";

import Header from "../components/Header";
import Sidedrawer from "../components/Sidedrawer";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGuardianApi,
  fetchNewsAPI,
  fetchNewYorkTimesApi,
} from "../util/appService";
import CardActionComponent from "../components/Card";
import { ArticleProps } from "../components/type";
import {
  getFormattedGuardianApiData,
  getFormattedNyData,
} from "../util/helper";
import { GUARDIANAPI, NEWSAPI, NYTIMES } from "../util/constant";
import { selectFilterData, updateFilterData } from "../store/slice/filterSlice";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  height: 75vh;
  overflow: auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  width: 95%;
  justify-content: flex-end;
  height: 5rem;
  align-items: center;
  nav {
    margin-top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  width: 100%;
`;

const Home = () => {
  // SideMenu state
  const [open, setOpen] = useState(false);

  const { data } = useSelector(selectFilterData);
  const dispatch = useDispatch();

  //States for API params
  const [queryParams, setQuerParams] = useState({
    q: "",
    from: "",
    sources: [0],
    pageSize: 30,
  });

  //Article list
  const [articles, setArticles] = useState<Partial<ArticleProps[]>>([]);

  //Pagination States
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 30,
    totalCount: 0,
  });

  //News Data APi call
  const {
    data: newApiData,
    isLoading: isNewsApiLoading,
    isFetching: isNewsApiFetching,
  } = useQuery({
    queryKey: [
      `news-api-${queryParams?.from}-${queryParams?.q}-${queryParams?.pageSize}-${page}`,
    ],
    queryFn: () => fetchNewsAPI({ ...queryParams, page }),
    enabled: queryParams?.sources?.includes(NEWSAPI),
  });

  // Guardian APi call
  const {
    data: guardianApiData,
    isLoading: isGuardianApiLoading,
    isFetching: isGuardianApiFetching,
  } = useQuery({
    queryKey: [`guardian-api-${queryParams?.from}-${queryParams?.q}-${page}`],
    queryFn: () => fetchGuardianApi({ ...queryParams, page }),
    enabled: queryParams?.sources?.includes(GUARDIANAPI),
  });

  //newyork APi call
  const {
    data: newyorkApiData,
  
    isLoading: isNewyorkApiLoading,
    isFetching: isNewyorkApiFetching,
  } = useQuery({
    queryKey: [`newyork-api-${queryParams?.from}-${queryParams?.q}-${page}`],
    queryFn: () => fetchNewYorkTimesApi({ ...queryParams, page }),
    enabled: queryParams?.sources?.includes(NYTIMES),
  });

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  //Pagination change
  const handleChange = (event: any, value: number) => {
    setPage(value);
  };


  useEffect(() => {
    setQuerParams({ ...queryParams, ...data });
  }, [data]);

  const updateQueryParams = (data: any) => {
    const sourcesLength = data?.sources?.length || 0;
    const pageSize = sourcesLength === 3 ? 10 : sourcesLength === 2 ? 20 : 30;

    setQuerParams({
      ...queryParams,
      ...data,
      pageSize,
    });
    dispatch(updateFilterData({ ...queryParams, ...data, pageSize }));
  };

    //Search handle
    const handleSearch = (searchText: string) => {
      updateQueryParams({q: searchText });
    
    };

  useEffect(() => {
    const arr: ArticleProps[] = [];
    let totalCount = 0;

    const sourceIncludes = queryParams?.sources || [];

    if (sourceIncludes.includes(NEWSAPI)) {
      const filteredArticles = newApiData?.articles?.filter(
        (el: ArticleProps) => !el?.title?.includes("Removed")
      );
      arr.push(...(filteredArticles || []));
      totalCount = newApiData?.totalResults || 0;
    }

    if (sourceIncludes.includes(GUARDIANAPI)) {
      arr.push(
        ...getFormattedGuardianApiData(guardianApiData?.response?.results??[])//Formatting the response as per the newsAPI data
      );
      totalCount = guardianApiData?.response?.total || 0;
    }

    if (sourceIncludes.includes(NYTIMES)) {
      arr.push(...getFormattedNyData(newyorkApiData?.response?.docs ?? []));////Formatting the response as per the newsAPI data
      totalCount = newyorkApiData?.response?.meta?.hits || 0;
    }

    setArticles(arr);
    setPaginationData({ ...paginationData, totalCount });
  }, [newApiData, guardianApiData, newyorkApiData]);


 

  return (
    <>
      <Header
        handleMenuClick={toggleDrawer}
        handleChange={(data) => handleSearch(data)}
      />
      <Sidedrawer
        open={open}
        toggleDrawer={toggleDrawer}
        handleFilterChange={updateQueryParams}
      />
      {isNewsApiFetching ||
      isNewsApiLoading ||
      isNewyorkApiLoading ||
      isNewyorkApiFetching ||
      isGuardianApiLoading ||
      isGuardianApiFetching ? (
        <Container>
          <CircularProgress sx={{ color: "black" }} />
        </Container>
      ) : articles?.length == 0 ? (
        <Container>No Records found</Container>
      ) : (
        <>
          <CardContainer>
            {articles?.map((el, index) => (
              <CardActionComponent data={el} key={index} />
            ))}
          </CardContainer>
          {Boolean(articles?.length > 0) && (
            <PaginationContainer>
              <Pagination
                count={Math.ceil(
                  paginationData?.totalCount / paginationData.itemsPerPage
                )} // Total pages
                page={page} // Current page
                onChange={(e, value) => handleChange(e, value)} // Page change handler
                variant="outlined" // Optional: style variant
                shape="rounded" // Optional: shape variant
                sx={{ marginTop: 2 }} // Optional: additional styling
              />
            </PaginationContainer>
          )}
        </>
      )}
    </>
  );
};

export default Home;
