import { computeStyleVars } from "./styleVars"

export const generateStyles = (externalVars) => {

    const computedVars = computeStyleVars(externalVars)

    const styles = `
        button {
            border: none;
            padding: 10px 20px;
            border-radius: ${computedVars.borderRadius.default}px;
            font-size: ${computedVars.fontSize.default}px;
            line-height: ${computedVars.lineHeight.default}px;
            cursor: pointer;
        }

        .widget-toggle-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: ${computedVars.primaryColor};
            color: ${computedVars.textColor.default};
            z-index: 1000;
        }

        .widget-close-button {
            background-color: ${computedVars.background[15]};
            color: ${computedVars.textColor.default};
        }

        .custom-select {
            position: relative;
            display: inline-block;
            background-color: ${computedVars.background.default};
            color: ${computedVars.textColor.default};
            min-width: 150px;
            border-radius: ${computedVars.borderRadius.default}px;
            overflow: visible;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .select-trigger {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: inherit;
            color: inherit;
            min-width: 150px;
        }

        .select-options {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: ${computedVars.background.default};
            color: ${computedVars.textColor.default};
            margin: 0;
            margin-top: 8px;
            padding: 0;
            list-style: none;
            opacity: 0; 
            visibility: hidden; 
            transform: translateY(-10px);
            transition: all 0.3s ease; 
            z-index: 1000;
            border-radius: ${computedVars.borderRadius.default}px;
        }

        .option.selected {
            background-color: ${computedVars.background[15]};
            color: ${computedVars.textColor.default};
        }

        .select-options .option {
            padding: 10px 20px;
            cursor: pointer;
        }

        .select-options .option:hover {
            background-color: ${computedVars.background[15]};
        }

        .custom-select.active .select-options {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .arrow {
            margin-left: 4px;
        }

        ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            border-radius: ${computedVars.borderRadius.sm}px;
        }
        ::-webkit-scrollbar-thumb {
            background: ${computedVars.background[10]};
            border-radius: ${computedVars.borderRadius.sm}px;
        }
        ::-webkit-scrollbar-corner {
            background: transparent;
        }

        .widget {
            display: none;
            position: fixed;
            bottom: 70px;
            right: 20px;
            width: 100%;
            max-width: 300px;
            height: 80vh;
            max-height: 600px;
            background: ${computedVars.background[80]};
            border-radius: ${computedVars.borderRadius.default}px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }

        .widget-header {
            display: flex;
            color: white;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
        }

        .card {
            padding: 16px;
            background: ${computedVars.background[4]};
            text-align: center;
            color: white;
            border-radius: ${computedVars.borderRadius.default}px;
            margin-bottom: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .card .price {
            font-size: ${computedVars.fontSize[24]}px;
            line-height: ${computedVars.lineHeight[32]}px;
            font-weight: 700;
            color: ${computedVars.primaryColor};
        }
        .reserve-btn {
            margin-top: 12px;
            background: ${computedVars.primaryColor};
            width: 100%;
            color: ${computedVars.textColor.default};
        }
        .widget-content {
            padding: 12px;
            overflow-y: auto;
            gap: 12px;
            height: calc(100% - 88px);
        }
        .widget-card-date {
            margin-top: 0;
        }

        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${computedVars.background[50]};
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1100;
        }
        /* Modal container */
        .modal {
            background-color: ${computedVars.background.default};
            padding: 20px;
            border-radius: ${computedVars.borderRadius.default}px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
            max-width: 500px;
            width: 90%;
        }
        /* Header */
        .modal-header {
            color: ${computedVars.textColor[80]};
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
        }
        .modal-description {
            margin-bottom: 24px;
            color: ${computedVars.textColor[80]};
        }
        .modal-additional-text {
            text-align: center;
            color: ${computedVars.primaryColor};
        }
        /* Form */
        .modal-body {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .modal-body label {
            font-size: ${computedVars.fontSize.default}px;
            line-height: ${computedVars.lineHeight.default}px;
            margin-bottom: 4px;
        }

        .modal-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
        }

        .save-button {
            background-color: ${computedVars.primaryColor};
            color: ${computedVars.textColor.default};
        }

        .input-label {
            display: block;
            color: ${computedVars.textColor[80]};
            font-size: ${computedVars.fontSize.default}px;
            line-height: ${computedVars.lineHeight.default}px;
            margin-bottom: 8px;
        }

        .input {
            width: -webkit-fill-available;
            background-color: ${computedVars.background[10]};
            border: none;
            border-radius: ${computedVars.borderRadius.default}px;
            color: ${computedVars.textColor[80]};
            padding: 8px 12px;
            font-size: ${computedVars.fontSize.default}px;
            line-height: ${computedVars.lineHeight.default}px;
            outline: none;
        }

        input::placeholder {
            color:${computedVars.textColor.placeholder};
        }`

    return styles
}