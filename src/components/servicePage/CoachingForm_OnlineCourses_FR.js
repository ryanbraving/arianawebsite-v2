import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import purple from "@material-ui/core/colors/purple"
import styled from "styled-components"
import { styles, SectionButton, RTL } from "../../utils"
import firebase from "../../firebase/FirebaseConfigs"

const db = firebase.firestore()
const colorPick = styles.colors.mainYellow
const stylesMaterialui = theme => ({
  container: {
    display: "block",
    // flexWrap: "wrap",
  },

  textField: {
    marginTop: "1.5rem",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    // width: 300,
  },

  root: {
    flexGrow: 1,
  },
  cssLabel: {
    "&$cssFocused": {
      color: colorPick,
    },
  },
  cssFocused: {},

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: colorPick,
    },
  },
  notchedOutline: {},
  margin: {
    margin: theme.spacing(1),
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
})

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  direction: "rtl", // Both here and <body dir="rtl">
})

class OutlinedTextFields extends React.Component {
  state = {
    name: "",
    country: "",
    email: "",
    phoneNo: "",
    telegramId: "",
    howFindAriana: "",
    subject: "",
    explaination: "",
    idealLife: "",
    otherProblem: "",
    whatActions: "",
    obstacle: "",
    registrationGoal: "",
    thankName: "",
    hideSubscribe: true,
    clientInfo: null,
    coachingTypeRequest: "",
  }

  componentDidMount() {
    // var request = new Request("https://api.ipdata.co/?api-key=test");
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url2 = "https://ipinfo.io/json"
    const url1 = "https://api.ipdata.co/?api-key=test"
    // fetch(proxyurl + url)
    // fetch(request, { mode: "no-cors" })
    fetch(url1)
      .then(response => response.json())
      .then(data => {
        //if url1 return null then try url2
        if (!data.ip) {
          fetch(url2)
            .then(response => response.json())
            .then(data => {
              data.provider = "url2: ipinfo"
              data.country_name = data.country
              this.setState({ clientInfo: data })
            })
        } else {
          data.provider = "url1: ipdata"
          this.setState({ clientInfo: data })
        }
      })
  }

  handleChange = arg => event => {
    this.setState({
      [arg]: event.target.value,
    })
  }

  addCoachingRequest = e => {
    e.preventDefault()
    const dbName = this.state.name
    const dbCountry = this.state.country
    const dbEmail = this.state.email
    const dbPhoneNo = this.state.phoneNo
    const dbTelegramId = this.state.telegramId
    const dbHowFindAriana = this.state.howFindAriana
    const dbSubject = this.state.subject
    const dbExplaination = this.state.explaination
    const dbIdealLife = this.state.idealLife
    const dbOtherProblem = this.state.otherProblem
    const dbWhatActions = this.state.whatActions
    const dbObstacle = this.state.obstacle
    const dbRegistrationGoal = this.state.registrationGoal
    const dbClientInfo = this.state.clientInfo
    const dbCoachingTypeRequest = this.state.coachingTypeRequest
    this.setState({
      thankName: this.state.name,
      name: "",
      country: "",
      email: "",
      phoneNo: 0,
      telegramId: "",
      howFindAriana: "",
      subject: "",
      explaination: "",
      idealLife: "",
      otherProblem: "",
      whatActions: "",
      obstacle: "",
      registrationGoal: "",
      hideSubscribe: false,
      coachingTypeRequest: "",
    })

    const timeNow = firebase.firestore.FieldValue.serverTimestamp()
    var refDoc = db
      .collection("Request-OnlineCourses-IdealLife-FR")
      // .doc(dbEmail.toLowerCase());
      .doc()
    refDoc
      .set({
        docId: refDoc.id,
        name: dbName,
        country: dbCountry,
        email: dbEmail,
        phone: dbPhoneNo,
        telegram: dbTelegramId,
        howFindAriana: dbHowFindAriana,
        subject: dbSubject,
        explaination: dbExplaination,
        idealLife: dbIdealLife,
        otherProblem: dbOtherProblem,
        whatActions: dbWhatActions,
        obstacle: dbObstacle,
        registrationGoal: dbRegistrationGoal,
        coachingTypeRequest: dbCoachingTypeRequest,
        createdAt: timeNow,
        clientInfo: dbClientInfo,
      })
      .then(function() {
        // console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error)
      })
    // this.sendEmail(dbName, dbEmail);
  }

  // sendEmail = (name, email) => {
  //   SendVerificationEmail(email);
  // };

  render() {
    const { classes, coachingTypeRequest } = this.props
    this.setState({
      coachingTypeRequest: coachingTypeRequest,
    })

    return (
      <FormWrapper hideSubscribe={this.state.hideSubscribe}>
        <form
          className={
            this.state.hideSubscribe
              ? classnames(classes.container, "form-show")
              : classnames(classes.container, "form-hide")
          }
          autoComplete="off"
          onSubmit={this.addCoachingRequest}
        >
          <RTL>
            <MuiThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  id="outlined-name"
                  label="نام و نام خانوادگی"
                  helperText="نام کامل خود را وارد کنید"
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                  variant="outlined"
                  // fullWidth
                  required
                  className={classes.textField}
                  style={{ width: 300 }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-helperText"
                  label="کشور و شهر محل اقامت "
                  helperText="جهت آگاهی از اختلاف ساعت"
                  value={this.state.country}
                  onChange={this.handleChange("country")}
                  margin="normal"
                  variant="outlined"
                  // fullWidth
                  required
                  className={classes.textField}
                  style={{ width: 300 }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />

                <TextField
                  id="outlined-email-input"
                  label="ایمیل"
                  helperText="ایمیل شما با کسی به اشتراک گذاشته نمی شود"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                  type="email"
                  margin="normal"
                  variant="outlined"
                  // fullWidth
                  // required
                  className={classes.textField}
                  style={{ width: 300 }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-number"
                  label="تلفن"
                  helperText=""
                  value={this.state.phoneNo}
                  onChange={this.handleChange("phoneNo")}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  // fullWidth
                  className={classes.textField}
                  style={{ width: 300 }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-helperText"
                  label="نام کاربری تلگرام "
                  helperText="در صورتیکه نام کاربری برای تلگرام ندارید، شماره تلفن تلگرام خود را وارد کنید"
                  value={this.state.telegramId}
                  onChange={this.handleChange("telegramId")}
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  style={{ width: 300 }}
                  // fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-helperText"
                  label="نحوه آشنایی"
                  helperText="از چه طریقی با آریانا آشنا شده اید؟"
                  value={this.state.howFindAriana}
                  onChange={this.handleChange("howFindAriana")}
                  margin="normal"
                  variant="outlined"
                  // fullWidth
                  required
                  className={classes.textField}
                  style={{ width: 300 }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <br />
                <br />
                <h3
                  style={{
                    // direction: "rtl",
                    // textAlign: "center",
                    color: `${styles.colors.mainGrey}`,
                  }}
                >
                  در حال حاضر دوره های کوچینگ گروهی در سه موضوع زیر انجام می
                  شود. لطفا موضوع مورد نظر خود را مشخص کنید:
                </h3>
                <br />
                <h4
                  style={{
                    color: `${styles.colors.mainGrey}`,
                  }}
                >
                  پذیرش خود و اعتماد به نفس - شناسایی افکار محدود کننده و تغییر
                  ذهنیت - دعوت آرامش و مدیریت استرس
                </h4>
                <TextField
                  id="outlined-helperText"
                  label="موضوع کوچینگ"
                  helperText="یکی از موضوعات بالا را انتخاب و در این قسمت وارد کنید"
                  value={this.state.subject}
                  onChange={this.handleChange("subject")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="خلاصه ای از شرایط فعلی زندگی خود بنویسید"
                  helperText="شغل، وضعیت تاهل، تعداد فرزندان، علایق شخصی و ..."
                  value={this.state.explaination}
                  onChange={this.handleChange("explaination")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="توصیف کوتاهی از زندگی ایده آل خود، یعنی زندگی که با همه وجود دوست دارید تجربه کنید بنویسید."
                  helperText="لطفا توجه کنید که این توصیفات غیر واقعی و تخیلی نباشند"
                  value={this.state.idealLife}
                  onChange={this.handleChange("idealLife")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="چه مسایل در زندگی شما خارج از هارمونی و آزار دهنده است؟"
                  // helperText="شغل، وضعیت تاهل، تعداد فرزندان، علایق شخصی و ..."
                  value={this.state.otherProblem}
                  onChange={this.handleChange("otherProblem")}
                  margin="normal"
                  variant="outlined"
                  // required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="چه اقداماتی برای عبور از چالشها و حرکت در مسیر زندگی ایده آلتان انجام داده اید؟"
                  // helperText="شغل، وضعیت تاهل، تعداد فرزندان، علایق شخصی و ..."
                  value={this.state.whatActions}
                  onChange={this.handleChange("whatActions")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="فکر می کنید بزرگترین موانع بر سر راه شما برای رسیدن به این زندگی ایده آلتان چیست؟"
                  // helperText="شغل، وضعیت تاهل، تعداد فرزندان، علایق شخصی و ..."
                  value={this.state.obstacle}
                  onChange={this.handleChange("obstacle")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  label="بزرگترین هدف شما از ثبت نام در این دوره چیست؟ "
                  // helperText="شغل، وضعیت تاهل، تعداد فرزندان، علایق شخصی و ..."
                  value={this.state.registrationGoal}
                  onChange={this.handleChange("registrationGoal")}
                  margin="normal"
                  variant="outlined"
                  required
                  className={classes.textField}
                  // style={{ fontSize: "1.6rem" }}
                  // style={{ width: 300 }}
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </div>
            </MuiThemeProvider>
          </RTL>

          <SectionButton
            type="submit"
            // className="subscribeBtn"
            style={{
              margin: "2rem auto",
              fontFamily: "Vazir",
              fontSize: "1.5rem",
              letterSpacing: "0.1rem",
            }}
          >
            ارسال
          </SectionButton>

          {/* <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            className={classnames(classes.margin, classes.cssRoot)}
          >
            Subscribe
          </Button> */}
        </form>
        <h1
          className={
            this.state.hideSubscribe
              ? "thanks thanks-hide"
              : "thanks thanks-show"
          }
        >
          تشکر <span className="thanks-name">{this.state.thankName}</span>
          <br /> درخواست کوچینگ شما دریافت شد.
          <br />
          بزودی یک نفر از تیم پشتیبان آریانا با شما تماس می گیرد.
        </h1>

        <p className={this.state.hideSubscribe ? "thanks-hide" : "thanks-show"}>
          اگر در مدت سه روز کاری کسی با شما تماس نگرفت، لطفا توسط ایمیل:{" "}
          <span style={{ color: "red" }}>info@ArianaBraving.com</span> یا
          تلگرام: <span style={{ color: "red" }}>AskAriana@</span> اطلاع دهید.
        </p>
      </FormWrapper>
    )
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(stylesMaterialui)(OutlinedTextFields)

const FormWrapper = styled.div`
 /* background: red; */
  /* height: 690px; */
  margin: 2rem auto;
  .form-show {
    /* display: ${props => (props.hideSubscribe ? "block" : "none")}; */
    opacity: 1;
    visibility: visible; 
  }
  .form-hide {
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
    opacity: 0;
    visibility: hidden;
    height:0px;
    /* overflow:hiden; */
  }
  .thanks{
    direction: rtl;
    margin: 1rem auto;
    color: ${styles.colors.mainGrey};
    font-size: 1.3rem;
    letter-spacing: 0rem;
    text-align: center;
    line-height: 4.7rem;
    word-spacing: 0.2rem;
  }
  .thanks-hide {
    opacity: 0;
    visibility: hidden; 
  }
  .thanks-show {
    -webkit-transition: 2s;
    -moz-transition: 2s;
    -o-transition: 2s;
    transition: 2s;
    opacity: 1;
    visibility: visible; 
  }
  .thanks-name{
    text-transform: capitalize;
    color: ${styles.colors.mainYellow};
  }
  p{
    font-style:italic;
    font-size: 0.9rem;
    text-align: center;
    direction: rtl;
  }
`
