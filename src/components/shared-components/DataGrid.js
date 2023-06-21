import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { makeStyles, withStyles } from "@mui/styles";
import { DataGridStyles } from "../../styles/DataGridStyles";
import { capitalize } from "../../utilities/helper";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    padding: 10,
    fontSize: 12,
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const useStyles = makeStyles(DataGridStyles);

const Details = ({ data, loadServerRows }) => {
  const classes = useStyles();
  const [page, setPage] = useState(data?.page);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    // When page has changed get the New data from server
    if (data?.page !== page) getData();
  }, [page]);

  // API Calls
  const getData = async () => await loadServerRows(page);

  const getColumns = () => {
    const { ...columns } = data?.results?.length ? data?.results[0] : [];

    return Object.keys(columns)
      .filter((c) => c !== "id")
      .map((col, index) => {
        return {
          index,
          field: col,
          headerName: capitalize(col),
          width: 150,
          editable: true,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return <b className="text-[14px]">{params.colDef.headerName}</b>;
          },
          renderCell: (params) => {
            if (col === "adult") {
              return (
                <HtmlTooltip title={params.value} placement="top" arrow>
                  <div className="d-flex justify-content-between align-items-center text-[12px]">
                    {params.value === true ? "Yes" : "No"}
                  </div>
                </HtmlTooltip>
              );
            } else {
              return (
                <HtmlTooltip title={params.value} placement="top" arrow>
                  <div className="d-flex justify-content-between align-items-center text-[12px]">
                    {params.value}
                  </div>
                </HtmlTooltip>
              );
            }
          },
        };
      });
  };

  return (
    <div>
      <Card className="w-full rounded-20 shadow">
        <div style={{ height: "500px", width: "100%" }}>
          <DataGrid
            className={classes.root}
            rowHeight={80}
            rows={data?.results}
            columns={getColumns()}
            rowCount={data?.total_results}
            disableSelectionOnClick
            checkboxSelection
            paginationMode="server"
            pageSize={pageSize}
            page={page - 1}
            onPageChange={(newPage) => setPage(newPage + 1)}
          />
        </div>
      </Card>
    </div>
  );
};

export default Details;
