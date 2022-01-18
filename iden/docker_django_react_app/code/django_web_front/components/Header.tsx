import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  db,
  storage,
  auth,
  signinWithEmailAndPassword,
} from "../firebase/firebase";
import { AuthContext } from "../context/auth";
import classes from "../styles/Header.module.scss";
import Link from "next/link";
import Router from "next/router";
import Camera from "./svg/Camera";
import Delete from "./svg/Delete";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import algoliasearch from "algoliasearch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const ALGOLIA_INDEX_NAME = "study-app";

const client = algoliasearch("77WZ20O6OE", "60af8ce0883b0f3a5ae5612e6bbf239f");
const index = client.initIndex(ALGOLIA_INDEX_NAME);

interface Props {
  onSearch: (e: any) => Promise<void>;
  setSearchUsers: React.Dispatch<React.SetStateAction<Array<any> | string>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = (props) => {
  const { onSearch, setSearchUsers, searchText, setSearchText } = props;
  const  user  = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>();
  const [selectedUseLanguage, setSelectedUseLanguage] = useState([]);
  const [selectedWillLanguage, setSelectedWillLanguage] = useState<
    Array<string>
  >([]);
  const [selectedAvatarURL, setSelectedAvatarURL] = useState<string>("");
  const [selectedAvatarPath, setSelectedAvatarPath] = useState<string>("");
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openSearchCancel, setOpenSearchCancel] = useState<boolean>();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [img, setImg] = useState<any>("");
  const [notifications, setNotifications] = useState<any>();
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const docRef = db.collection("users").doc(auth.currentUser.uid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setSelectedName(doc.data().name);
        setSelectedExperience(doc.data().experience);
        setSelectedUseLanguage(doc.data().useLanguage);
        setSelectedWillLanguage(doc.data().willLanguage);
        setSelectedAvatarURL(doc.data().avatarURL);
        setSelectedAvatarPath(doc.data().avatarPath);
      }
    });

    db.collection("notifications")
      .doc(auth.currentUser.uid)
      .collection("notice")
      .where("unread", "in", [true])
      .get()
      .then((querySnapshot) => {
        const notificationData = [];
        querySnapshot.forEach((doc) => {
          notificationData.push(doc.data());
        });
        setNotifications(notificationData);
      });
  }, []);

  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const storageRef = storage.ref();
        const imagesRef = storageRef.child(
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        const snap = await imagesRef.put(img);
        await snap.ref.getDownloadURL().then(function (URL) {
          setSelectedAvatarURL(URL);
          setSelectedAvatarPath(snap.ref.fullPath);
        });
        setImg("");
      };
      uploadImg();
    }
  }, [img]);

  //言語の種類
  const names = [
    "HTML",
    "CSS",
    "JavaScript",
    "Java",
    "PHP",
    "Ruby",
    "React",
    "Python",
    "Go",
    "C",
    "C#",
    "C++",
    "Rust",
    "Swift",
    "TypeScript",
    "SQL",
    "Node.js",
    "VBA",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileClick = () => {
    setOpenProfile(true);
  };
  const handleProfileClose = useCallback(() => setOpenProfile(false), []);

  const handleChangeLanguage = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUseLanguage(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeWillLanguage = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWillLanguage(
      typeof value === "string" ? value.split(",") : value
    );
  };

  //ユーザーアイコンを削除した時に挙動
  const deleteImage = async () => {
    const confirm = window.confirm(
      "プロフィール画像を削除してよろしいですか？"
    );
    if (confirm) {
      const storageRef = storage.ref();
      await storageRef.child(selectedAvatarPath).delete();

      await db.collection("users").doc(user.uid).update({
        avatarURL: "",
        avatarPath: "",
      });
      await setSelectedAvatarURL("");
      await setSelectedAvatarPath("");
    }
  };

  //プロフィール編集の保存ボタンを押した時の挙動
  const profileSave = async () => {
    await setAlertOpen(true);
    await db.collection("users").doc(user.uid).set(
      {
        name: selectedName,
        experience: selectedExperience,
        useLanguage: selectedUseLanguage,
        willLanguage: selectedWillLanguage,
        avatarPath: selectedAvatarPath,
        avatarURL: selectedAvatarURL,
      },
      { merge: true }
    );
    await setOpenProfile(false);
  };

  const handleOpenSearchCancel = () => {
    setOpenSearchCancel(true);
  };

  //検索フォームの✖ボタンを押した時の挙動
  const searchCancel = () => {
    setSearchText("");
    setSearchUsers("");
    setOpenSearchCancel(false);
  };

  const handleSettingPage = () => {
    Router.push("/home/setting");
  };

  const handleNotifications = () => {
    Router.push("/home/notifications");
  };

  const returnHomePage = () => {
    Router.push("/home");
    // window.location.reload();
  };

  const handleLogout = async () => {
    Router.push("/signin");
    setAnchorEl(null);
    auth.currentUser.uid &&
      (await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .update({ isOnline: false }));
    await auth.signOut();
  };

  const handleGuestSignin = async (e) => {
    e.preventDefault();
    const result = await signinWithEmailAndPassword("bbb@gmail.com", "123123");
    window.location.reload();
    await db
      .collection("users")
      .doc(result.user.uid)
      .update({ isOnline: true });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileClick}>
        <AccountBoxIcon sx={{ marginRight: "8px" }} />
        プロフィール
      </MenuItem>
      <MenuItem onClick={handleSettingPage}>
        <SettingsApplicationsIcon />
        <p style={{ margin: "auto" }}>設定</p>
      </MenuItem>
      <MenuItem onClick={handleNotifications}>
        <Badge
          badgeContent={notifications && notifications.length}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
        <p style={{ margin: "auto" }}>通知</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        <p style={{ margin: "auto" }}>ログアウト</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={() => setAlertOpen(false)}
        >
          <Alert severity="success">プロフィールを更新しました!</Alert>
        </Snackbar>
      </Stack>
      <Box sx={{ flexGrow: 1 }} className={classes.header_container}>
        <AppBar position="static" style={{ height: "64px" }}>
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
            >
              <span onClick={returnHomePage}>MOKUPUT</span>
            </Typography>
            <Search className={classes.search_wrapper}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="ユーザー名、言語で検索"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={onSearch}
                onClick={handleOpenSearchCancel}
              />
              {openSearchCancel && searchText ? (
                <>
                  <Button onClick={searchCancel} style={{ padding: "0" }}>
                    <CloseIcon style={{ color: "white" }} />
                  </Button>
                </>
              ) : null}
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {auth.currentUser === null ? (
                <div className={classes.button_container}>
                  <a onClick={handleGuestSignin}>ゲストログイン</a>
                  <Link href="/signin">
                    <a>ログイン</a>
                  </Link>
                  <Link href="/signup">
                    <a>新規登録</a>
                  </Link>
                </div>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={selectedAvatarURL}
                    sx={{ width: "50px", height: "50px" }}
                  />
                  <Badge
                    badgeContent={notifications && notifications.length}
                    color="error"
                    sx={{
                      position: "relative",
                      top: "-16px",
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Modal open={openProfile} onClose={handleProfileClose}>
        <Box className={classes.box}>
          <Typography variant="h6" className={classes.title}>
            プロフィール編集
            <button className={classes.saveButton} onClick={profileSave}>
              保存
            </button>
            <CloseIcon
              fontSize="large"
              className={classes.closeIcon}
              onClick={handleProfileClose}
            />
          </Typography>
          <div className={classes.profile}>
            <div className={classes.img_container}>
              <Avatar
                src={selectedAvatarURL || null}
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
              <div className={classes.overlay}>
                <div style={{ display: "flex" }}>
                  <label htmlFor="photo">
                    <Camera />
                  </label>
                  {selectedAvatarURL ? (
                    <Delete deleteImage={deleteImage} />
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
          <Typography className={classes.typograpphy_name}>名前</Typography>
          <Stack spacing={2}>
            <form className={classes.nameForm}>
              <input
                className={classes.nameText}
                type="text"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </form>
            <Typography className={classes.typography}>実務経験</Typography>
            <FormControl component="fieldset" sx={{ ml: 3 }}>
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="あり"
                />
                <FormControlLabel value="no" control={<Radio />} label="なし" />
              </RadioGroup>
            </FormControl>
            <Typography className={classes.typography}>
              実務で使っている言語
            </Typography>
            <FormControl variant="standard" fullWidth sx={{ ml: 3 }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedUseLanguage}
                onChange={handleChangeLanguage}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={selectedUseLanguage.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography className={classes.typography}>勉強中の言語</Typography>
            <FormControl variant="standard" fullWidth sx={{ ml: 3 }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedWillLanguage}
                onChange={handleChangeWillLanguage}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={selectedWillLanguage.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
