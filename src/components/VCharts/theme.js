import echarts from 'echarts/lib/echarts'

// 自定义主题
const theme = 'V-ECharts'
echarts.registerTheme(theme, {
  'color': [
    '#3879f5',
    '#67c23a',
    '#e6a23c',
    '#f56c6c',
    '#9e62f2'
  ],
  // "backgroundColor": "rgba(245,247,250,1)",
  'textStyle': {},
  'title': {
    'textStyle': {
      'color': '#303133'
    },
    'subtextStyle': {
      'color': '#606266'
    }
  },
  'line': {
    'itemStyle': {
      'normal': {
        'borderWidth': 1
      }
    },
    'lineStyle': {
      'normal': {
        'width': 2
      }
    },
    'symbolSize': 4,
    'symbol': 'circle',
    'smooth': false
  },
  'radar': {
    'itemStyle': {
      'normal': {
        'borderWidth': 1
      }
    },
    'lineStyle': {
      'normal': {
        'width': 2
      }
    },
    'symbolSize': 4,
    'symbol': 'circle',
    'smooth': false
  },
  'bar': {
    'itemStyle': {
      'normal': {
        'barBorderWidth': '0',
        'barBorderColor': '#ccc'
      },
      'emphasis': {
        'barBorderWidth': '0',
        'barBorderColor': '#ccc'
      }
    }
  },
  'pie': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'scatter': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'boxplot': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'parallel': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'sankey': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'funnel': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'gauge': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      },
      'emphasis': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    }
  },
  'candlestick': {
    'itemStyle': {
      'normal': {
        'color': '#3879f5',
        'color0': '#67c23a',
        'borderColor': '#3879f5',
        'borderColor0': '#67c23a',
        'borderWidth': 1
      }
    }
  },
  'graph': {
    'itemStyle': {
      'normal': {
        'borderWidth': '0',
        'borderColor': '#ccc'
      }
    },
    'lineStyle': {
      'normal': {
        'width': '1',
        'color': '#ccc7c8'
      }
    },
    'symbolSize': 4,
    'symbol': 'circle',
    'smooth': false,
    'color': [
      '#3879f5',
      '#67c23a',
      '#e6a23c',
      '#f56c6c',
      '#9e62f2'
    ],
    'label': {
      'normal': {
        'textStyle': {
          'color': '#ffffff'
        }
      }
    }
  },
  'map': {
    'itemStyle': {
      'normal': {
        'areaColor': '#eee',
        'borderColor': '#444',
        'borderWidth': 0.5
      },
      'emphasis': {
        'areaColor': 'rgba(255,215,0,0.8)',
        'borderColor': '#444',
        'borderWidth': 1
      }
    },
    'label': {
      'normal': {
        'textStyle': {
          'color': '#000'
        }
      },
      'emphasis': {
        'textStyle': {
          'color': 'rgb(100,0,0)'
        }
      }
    }
  },
  'geo': {
    'itemStyle': {
      'normal': {
        'areaColor': '#eee',
        'borderColor': '#444',
        'borderWidth': 0.5
      },
      'emphasis': {
        'areaColor': 'rgba(255,215,0,0.8)',
        'borderColor': '#444',
        'borderWidth': 1
      }
    },
    'label': {
      'normal': {
        'textStyle': {
          'color': '#000'
        }
      },
      'emphasis': {
        'textStyle': {
          'color': 'rgb(100,0,0)'
        }
      }
    }
  },
  'categoryAxis': {
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#dcdfe6'
      }
    },
    'axisTick': {
      'show': false,
      'lineStyle': {
        'color': '#e4e7ed'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#909399'
      }
    },
    'splitLine': {
      'show': true,
      'lineStyle': {
        'color': [
          '#e4e7ed'
        ]
      }
    },
    'splitArea': {
      'show': false,
      'areaStyle': {
        'color': [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  'valueAxis': {
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#dcdfe6'
      }
    },
    'axisTick': {
      'show': false,
      'lineStyle': {
        'color': '#e4e7ed'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#909399'
      }
    },
    'splitLine': {
      'show': true,
      'lineStyle': {
        'color': [
          '#e4e7ed'
        ]
      }
    },
    'splitArea': {
      'show': false,
      'areaStyle': {
        'color': [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  'logAxis': {
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#dcdfe6'
      }
    },
    'axisTick': {
      'show': false,
      'lineStyle': {
        'color': '#e4e7ed'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#909399'
      }
    },
    'splitLine': {
      'show': true,
      'lineStyle': {
        'color': [
          '#e4e7ed'
        ]
      }
    },
    'splitArea': {
      'show': false,
      'areaStyle': {
        'color': [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  'timeAxis': {
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#dcdfe6'
      }
    },
    'axisTick': {
      'show': false,
      'lineStyle': {
        'color': '#e4e7ed'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#909399'
      }
    },
    'splitLine': {
      'show': true,
      'lineStyle': {
        'color': [
          '#e4e7ed'
        ]
      }
    },
    'splitArea': {
      'show': false,
      'areaStyle': {
        'color': [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  'toolbox': {
    'iconStyle': {
      'normal': {
        'borderColor': '#606266'
      },
      'emphasis': {
        'borderColor': '#3879f5'
      }
    }
  },
  'legend': {
    'textStyle': {
      'color': '#606266'
    }
  },
  'tooltip': {
    'axisPointer': {
      'lineStyle': {
        'color': '#909399',
        'width': '1'
      },
      'crossStyle': {
        'color': '#909399',
        'width': '1'
      }
    }
  },
  'timeline': {
    'lineStyle': {
      'color': '#909399',
      'width': 1
    },
    'itemStyle': {
      'normal': {
        'color': '#909399',
        'borderWidth': '1'
      },
      'emphasis': {
        'color': '#3879f5'
      }
    },
    'controlStyle': {
      'normal': {
        'color': '#909399',
        'borderColor': '#909399',
        'borderWidth': '0.5'
      },
      'emphasis': {
        'color': '#909399',
        'borderColor': '#909399',
        'borderWidth': '0.5'
      }
    },
    'checkpointStyle': {
      'color': '#3879f5',
      'borderColor': 'rgba(132,172,248,1)'
    },
    'label': {
      'normal': {
        'textStyle': {
          'color': '#909399'
        }
      },
      'emphasis': {
        'textStyle': {
          'color': '#909399'
        }
      }
    }
  },
  'visualMap': {
    'color': [
      '#f56c6c',
      '#e6a23c'
    ]
  },
  'dataZoom': {
    'backgroundColor': 'rgba(240,242,245,1)',
    'dataBackgroundColor': 'rgba(192,196,204,1)',
    'fillerColor': 'rgba(240,242,245,1)',
    'handleColor': '#c0c4cc',
    'handleSize': '100%',
    'textStyle': {
      'color': '#606266'
    }
  },
  'markPoint': {
    'label': {
      'normal': {
        'textStyle': {
          'color': '#ffffff'
        }
      },
      'emphasis': {
        'textStyle': {
          'color': '#ffffff'
        }
      }
    }
  }
})

export default theme
