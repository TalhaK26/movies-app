import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import { makeStyles, withStyles } from "@mui/styles";
import { DataGridStyles } from "../../styles/DataGridStyles";
import { capitalize } from "../../utilities/helper";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useSelector } from "react-redux";

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

const Details = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleNavigateToDetails = (job) => {
    history.push({
      pathname: `/job_detail/${job?.id}`,
      state: {
        currentJob: job,
      },
    });
  };

  const getColumns = () => {
    const { ...columns } = data?.results[0];
    // columns["actions"] = "";
    console.log("columns", columns);

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
            return (
              <>
                {col === "adult" && (
                  <HtmlTooltip title={params.value} placement="top" arrow>
                    <div className="d-flex justify-content-between align-items-center text-[12px]">
                      {params.value === true ? "Yes" : "No"}
                    </div>
                  </HtmlTooltip>
                )}

                {col !== "adult" && (
                  <HtmlTooltip title={params.value} placement="top" arrow>
                    <div className="d-flex justify-content-between align-items-center text-[12px]">
                      {params.value}
                    </div>
                  </HtmlTooltip>
                )}
              </>
            );
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
            pagination
            paginationMode="server"
            rowHeight={80}
            rows={data?.results}
            columns={getColumns()}
            onRowClick={(params, event) => {
              if (!event.ignore) handleNavigateToDetails(params.row);
            }}
            rowCount={data?.results?.length}
            rowsPerPageOptions={[10, 30, 50, 100]}
            disableSelectionOnClick
            checkboxSelection
          />
        </div>
      </Card>
    </div>
  );
};

export default Details;
