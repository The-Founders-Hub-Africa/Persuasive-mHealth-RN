import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingVertical: 20,
    minHeight: "100%",
    backgroundColor: theme.colors.white,
  },

  // for the search input
  searchInputCntr: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
  },
  searchIconCntr: {
    padding: 16,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    padding: 16,
    flex: 1,
    color: "#333",
  },

  // for input error text
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },

  // images
  logoRect: {
    width: 218,
    height: 80,
    marginBottom: 16,
    alignSelf: "center",
  },

  squareImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignSelf: "center",
  },

  // for the three dots dropdown
  actionsBtn: {
    marginInlineStart: "auto",
    zIndex: 100,
  },
  actionsDropdown: {
    position: "absolute",
    right: 10,
    top: 50,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 200,
  },
});

export default globalStyles;
