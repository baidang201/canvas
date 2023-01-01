package cli

import (
	"strconv"

	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCreateCanvas() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-canvas [id] [width] [height] [refund-duration] [allow-denom-prefix] [price-for-point]",
		Short: "Broadcast message createCanvas",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argWidth, err := cast.ToUint64E(args[1])
			if err != nil {
				return err
			}
			argHeight, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}
			argRefundDuration := args[3]
			argAllowDenomPrefix := args[4]
			argPriceForPoint, err := cast.ToUint64E(args[5])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateCanvas(
				clientCtx.GetFromAddress().String(),
				argId,
				argWidth,
				argHeight,
				argRefundDuration,
				argAllowDenomPrefix,
				argPriceForPoint,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
