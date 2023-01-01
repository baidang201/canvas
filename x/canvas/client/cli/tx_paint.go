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

func CmdPaint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "paint [id] [x] [y] [amount]",
		Short: "Broadcast message paint",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argX, err := cast.ToUint64E(args[1])
			if err != nil {
				return err
			}
			argY, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}
			argAmount, err := cast.ToUint64E(args[3])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgPaint(
				clientCtx.GetFromAddress().String(),
				argId,
				argX,
				argY,
				argAmount,
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
