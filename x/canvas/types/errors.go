package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/canvas module sentinel errors
var (
	ErrSample             = sdkerrors.Register(ModuleName, 1100, "sample error")
	ErrCanvasAlreadyExist = sdkerrors.Register(ModuleName, 2, "canvas already exist")
	ErrCanvasNotExist     = sdkerrors.Register(ModuleName, 3, "canvas not exist")

	ErrPointGetOut        = sdkerrors.Register(ModuleName, 4, "point get out of the canvas")
	ErrInvalidDenomPrefix = sdkerrors.Register(ModuleName, 5, "invalid denom")
	ErrInvalidAmount      = sdkerrors.Register(ModuleName, 6, "invalid amount")
)
