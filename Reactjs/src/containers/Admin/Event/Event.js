import React, { Component } from "react";
import Sidenav from "../../../components/Sidenav/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./Event.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import AddIcon from "@mui/icons-material/Add";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import { emitter } from "../../../utils/emitter";
import {
  getAllEventService,
  getCreateNewEventService,
  getEditEventService,
  getDeleteEventService,
  getAllEventService1,
} from "../../../services/index";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllEvent: [],
      AllEvent1: [],
      isOpen: false,
      isOpenModaEdit: false,
      date: dayjs(),
      EventEdit: {},
    };
  }

  handleAddNewEvent = () => {
    this.setState({
      isOpen: true,
    });
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  oggle = () => {
    this.setState({
      isOpenModaEdit: !this.state.isOpenModaEdit,
    });
  };

  async componentDidMount() {
    await this.getAllEventFromReact();
    await this.getAllEventFromReact1();
  }
  handleChangeDatePicker = (date) => {
    this.setState(
      {
        date: date,
      },
      async () => {
        await this.getAllEventFromReact();
        await this.getAllEventFromReact1();
      }
    );
  };
  getAllEventFromReact = async () => {
    let { date } = this.state;
    let formattedDate = date.format("ddd MMM D YYYY");
    let res = await getAllEventService({
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        AllEvent: res.data,
      });
    }
  };
  getAllEventFromReact1 = async () => {
    let res = await getAllEventService1("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        AllEvent1: res.data,
      });
    }
  };
  createNewEvent = async (data) => {
    try {
      let res = await getCreateNewEventService(data);
      if (res && res.errCode !== 0) {
        toast.error(res.errMessage);
      } else {
        await this.getAllEventFromReact();
        await this.getAllEventFromReact1();
        toast.success("Thêm sự kiện thành công");
        this.setState({
          isOpen: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteEvent = async (Event) => {
    try {
      let res = await getDeleteEventService(Event.id);
      if (res && res.errCode === 0) {
        await this.getAllEventFromReact();
        await this.getAllEventFromReact1();
        toast.success("Xóa sự kiện thành công");
      } else {
        toast.error(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  handEditEvent = (Event) => {
    this.setState({
      isOpenModaEdit: true,
      EventEdit: Event,
    });
  };
  doEditEvent = async (Event) => {
    try {
      let res = await getEditEventService(Event);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModaEdit: false,
        });
        await this.getAllEventFromReact();
        await this.getAllEventFromReact1();
        toast.success("Chỉnh sữa thành công");
      } else {
        toast.error(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { AllEvent, AllEvent1 } = this.state;
    return (
      <>
        <div className="bgcolor">
          <AddEvent
            className="Modal-custom"
            isOpen={this.state.isOpen}
            toggleFromParent={this.toggle}
            createNewEvent={this.createNewEvent}
            date={this.state.date}
          />
          {this.state.isOpenModaEdit && (
            <EditEvent
              isOpen={this.state.isOpenModaEdit}
              toggleFromParent={this.oggle}
              currentEvent={this.state.EventEdit}
              editEvent={this.doEditEvent}
            />
          )}
          <Navbar />
          <Box height={80} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Box height={10} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={{ height: 82 + "vh" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        orientation="landscape"
                        value={this.state.date}
                        onChange={this.handleChangeDatePicker}
                        minDate={dayjs().startOf("day")}
                      />
                    </LocalizationProvider>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <Card sx={{ height: 40 + "vh" }}>
                    <div className="contait">
                      <button
                        className="btn btn-primary my-3 mx-3"
                        onClick={() => this.handleAddNewEvent()}
                      >
                        <AddIcon />
                        Thêm Sự Kiện
                      </button>

                      <div className="custom-table">
                        {AllEvent.length === 0 ? (
                          <p
                            className="no-events"
                            style={{ fontStyle: "italic" }}
                          >
                            Không có sự kiện trong thời gian này.
                          </p>
                        ) : (
                          <Scrollbars autoHide style={{ height: "265px" }}>
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">STT</th>
                                  <th className="customcolumn" scope="col">
                                    Sự Kiện
                                  </th>
                                  <th className="customcolumn" scope="col">
                                    Chi Tiết
                                  </th>
                                  <th className="customcolumn" scope="col">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {AllEvent.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td className="customcolumn">
                                        {item.nameEvent}
                                      </td>
                                      <td className="customcolumn">
                                        {item.description}
                                      </td>
                                      <td className="customcolumn">
                                        <button
                                          type="button"
                                          className="btn btn-warning px-3 mx-2"
                                          onClick={() =>
                                            this.handEditEvent(item)
                                          }
                                        >
                                          Edit
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-danger px-3"
                                          onClick={() =>
                                            this.handleDeleteEvent(item)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </Scrollbars>
                        )}
                      </div>
                    </div>
                  </Card>
                  <Box height={20} />
                  <Card sx={{ height: 40 + "vh" }}>
                    <>
                      <div className="custom-shedule">
                        {AllEvent1.length === 0 ? (
                          <p
                            className="no-events"
                            style={{ fontStyle: "italic" }}
                          >
                            Không có sự kiện.
                          </p>
                        ) : (
                          <Scrollbars autoHide style={{ height: "310px" }}>
                            <div className="container">
                              <div className="row">
                                {AllEvent1 &&
                                  AllEvent1.length > 0 &&
                                  AllEvent1.filter(
                                    (item) =>
                                      new Date(item.date) >=
                                      new Date(new Date().toDateString())
                                  )
                                    .sort(
                                      (a, b) =>
                                        new Date(a.date) - new Date(b.date)
                                    )
                                    .map((item, index) => {
                                      const formattedDate = new Date(
                                        item.date
                                      ).toDateString();
                                      return (
                                        <div
                                          className="col-md-2 mb-3 mx-3"
                                          key={index}
                                        >
                                          <div className="card tilet-custom">
                                            <div className="img-container">
                                              <div className="bg-image-card text-center my-1">
                                                {formattedDate}
                                              </div>
                                            </div>
                                            <div className="position text-center my-1">
                                              <div>{item.nameEvent}</div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                          </Scrollbars>
                        )}
                      </div>
                    </>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </>
    );
  }
}
export default Event;
