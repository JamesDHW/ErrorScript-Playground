importScripts(self.location.origin + '/cdn/errorscript/typescript.js');
var errorscriptTS = self.ts;
var UNUSED_TS_EXPECT_ERROR = 2578;

function filterDiagnostics(list) {
  if (!list || list.length === 0) return list;
  return list.filter(function (d) { return d.code !== UNUSED_TS_EXPECT_ERROR; });
}

self.customTSWorkerFactory = function (TypeScriptWorker, _defaultTS, _libFileMap) {
  try {
    var ts = errorscriptTS;
    if (!ts || typeof ts.createLanguageService !== 'function') {
      throw new Error('ErrorScript typescript.js did not set self.ts or createLanguageService');
    }

    return (function (Base) {
      function fileNameIsLib(fileName) {
        if (typeof fileName !== 'string') return false;
        if (/^file:\/\/\//.test(fileName)) return !!_libFileMap[fileName.substr(8)];
        return false;
      }
      return (function (BaseClass) {
        class ErrorScriptWorker extends BaseClass {
          constructor(ctx, createData) {
            super(ctx, createData);
            this._errorScriptLS = ts.createLanguageService(this);
            this._languageService = this._errorScriptLS;
            this.getSyntacticDiagnostics = this.getSyntacticDiagnostics.bind(this);
            this.getSemanticDiagnostics = this.getSemanticDiagnostics.bind(this);
            this.getSuggestionDiagnostics = this.getSuggestionDiagnostics.bind(this);
            this.getCompilerOptionsDiagnostics = this.getCompilerOptionsDiagnostics.bind(this);
            this.getEmitOutput = this.getEmitOutput.bind(this);
          }
        getSyntacticDiagnostics(fileName) {
          if (fileNameIsLib(fileName)) return Promise.resolve([]);
          var diagnostics = filterDiagnostics(this._errorScriptLS.getSyntacticDiagnostics(fileName));
          return Promise.resolve(BaseClass.clearFiles(diagnostics));
        }
        getSemanticDiagnostics(fileName) {
          if (fileNameIsLib(fileName)) return Promise.resolve([]);
          var diagnostics = filterDiagnostics(this._errorScriptLS.getSemanticDiagnostics(fileName));
          return Promise.resolve(BaseClass.clearFiles(diagnostics));
        }
        getSuggestionDiagnostics(fileName) {
          if (fileNameIsLib(fileName)) return Promise.resolve([]);
          var diagnostics = filterDiagnostics(this._errorScriptLS.getSuggestionDiagnostics(fileName));
          return Promise.resolve(BaseClass.clearFiles(diagnostics));
        }
        getCompilerOptionsDiagnostics(fileName) {
          if (fileNameIsLib(fileName)) return Promise.resolve([]);
          var diagnostics = filterDiagnostics(this._errorScriptLS.getCompilerOptionsDiagnostics());
          return Promise.resolve(BaseClass.clearFiles(diagnostics));
        }
        getEmitOutput(fileName, emitOnlyDtsFiles, forceDtsEmit) {
          if (fileNameIsLib(fileName)) return Promise.resolve({ outputFiles: [], emitSkipped: true });
          var out = this._errorScriptLS.getEmitOutput(fileName, emitOnlyDtsFiles, forceDtsEmit);
          var diagnostics = out.diagnostics ? BaseClass.clearFiles(filterDiagnostics(out.diagnostics)) : undefined;
          return Promise.resolve(Object.assign({}, out, { diagnostics: diagnostics }));
        }
      }
      return ErrorScriptWorker;
    })(Base);
  })(TypeScriptWorker);
  } catch (err) {
    self.console.error('[tsWorkerWrapper] ErrorScript worker init failed, using default TS:', err);
    return TypeScriptWorker;
  }
};
