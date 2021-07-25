export default {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        '.form': {
          textAlign: 'center',
        },
        '.image': {
          margin: '0 auto 20px'
        },
        '.pageTitle': {
          margin: '0 auto 20px'
        },
        '.textField': {
          margin: '10px auto'
        },
        '.button': {
          marginTop: 20,
          marginBottom: 10,
          position: 'relative'
        },
        '.customError': {
          color: 'red',
          fontSize: '0.8rem',
        },
        '.progress': {
          position: 'absolute',
        }
      },
    },
  },
}